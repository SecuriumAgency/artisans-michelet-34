"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const PIPE_POINTS: [number, number, number][] = [
  [-7, -2.5, -3],
  [-3.5, 1.8, -1],
  [0, -1.6, 0.5],
  [3.5, 2, 1.5],
  [7, -1, -1],
];

/** Procedural flowing normal map — generated on canvas at runtime, no network fetch. */
function generateWaterNormalMap(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * Math.PI * 2;
      const v = (y / size) * Math.PI * 2;
      let n = 0;
      n += Math.sin(u * 4 + v * 1.3) * 0.5;
      n += Math.sin(v * 5.5 - u * 2.1) * 0.32;
      n += Math.sin((u + v) * 7.3) * 0.14;
      height[y * size + x] = n;
    }
  }

  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const x1 = (x + 1) % size;
      const y1 = (y + 1) % size;
      const hC = height[y * size + x];
      const hX = height[y * size + x1];
      const hY = height[y1 * size + x];
      const dx = (hX - hC) * 2.2;
      const dy = (hY - hC) * 2.2;
      const nx = -dx;
      const ny = -dy;
      const nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const i = (y * size + x) * 4;
      img.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1);
  return texture;
}

/** Outer glass/metal shell (transmission) + inner flowing-water core. */
function GlassPipe() {
  const groupRef = useRef<THREE.Group>(null);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(PIPE_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
    []
  );
  const outerGeometry = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.55, 24, false), [curve]);
  const innerGeometry = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.34, 20, false), [curve]);
  const waterNormalMap = useMemo(() => generateWaterNormalMap(), []);

  useFrame((state, delta) => {
    waterNormalMap.offset.x -= delta * 0.5;

    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={innerGeometry}>
        <meshPhysicalMaterial
          color="#0AA8C2"
          roughness={0.12}
          metalness={0.05}
          transmission={0.55}
          ior={1.33}
          normalMap={waterNormalMap}
          normalScale={new THREE.Vector2(0.7, 0.7)}
          emissive="#0AA8C2"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh geometry={outerGeometry}>
        <MeshTransmissionMaterial
          transmission={1}
          ior={1.33}
          thickness={1.5}
          chromaticAberration={0.05}
          roughness={0.05}
          background={new THREE.Color("#020617")}
          resolution={512}
          samples={2}
          anisotropicBlur={0.1}
        />
      </mesh>
    </group>
  );
}

/** Premium desktop-only scene: glass/water pipe + cinematic post-processing. */
export default function GlassPipeScene() {
  return (
    <>
      <GlassPipe />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.4} intensity={0.6} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.65} />
      </EffectComposer>
    </>
  );
}
