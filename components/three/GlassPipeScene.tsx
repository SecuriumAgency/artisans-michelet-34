"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const OUTER_RADIUS = 0.6;
const INNER_RADIUS = OUTER_RADIUS * 0.85;

/** Curve spans the current viewport, so it stays full-bleed on any screen width. */
function useResponsiveCurve(): THREE.CatmullRomCurve3 {
  const width = useThree((state) => state.viewport.width);
  const height = useThree((state) => state.viewport.height);

  return useMemo(() => {
    const w = width * 0.65;
    const h = Math.min(height * 0.55, w * 0.5);
    const points = [
      new THREE.Vector3(-w, -h * 0.5, -3),
      new THREE.Vector3(-w * 0.5, h * 0.6, -1),
      new THREE.Vector3(0, -h * 0.4, 0.5),
      new THREE.Vector3(w * 0.5, h * 0.6, 1.5),
      new THREE.Vector3(w, -h * 0.4, -1),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, [width, height]);
}

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

/** Copper transparent shell + animated water core. */
function CopperPipe() {
  const groupRef = useRef<THREE.Group>(null);
  const curve = useResponsiveCurve();
  const dpr = useThree((state) => state.viewport.dpr);
  // MeshTransmissionMaterial renders an off-screen FBO pass every frame — the single
  // most expensive part of this scene. Scale its resolution down on high-DPR screens
  // (Retina/4K) to keep that pass cheap without touching the on-screen dpr cap.
  const transmissionResolution = dpr > 2 ? 256 : dpr > 1 ? 384 : 512;

  const outerGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 140, OUTER_RADIUS, 24, false),
    [curve]
  );
  const innerGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 140, INNER_RADIUS, 20, false),
    [curve]
  );
  const waterNormalMap = useMemo(() => generateWaterNormalMap(), []);

  useFrame((state, delta) => {
    waterNormalMap.offset.x -= delta * 2.0;

    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={innerGeometry} renderOrder={0}>
        <meshPhysicalMaterial
          color="#00E5FF"
          transmission={0.4}
          transparent
          opacity={0.95}
          roughness={0.1}
          ior={1.33}
          depthWrite={false}
          fog={false}
          normalMap={waterNormalMap}
          normalScale={new THREE.Vector2(0.7, 0.7)}
          emissive="#00E5FF"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* No `background` prop: MeshTransmissionMaterial then captures the live scene
          behind it (including the water mesh above) instead of a flat static color. */}
      <mesh geometry={outerGeometry} renderOrder={1}>
        <MeshTransmissionMaterial
          color="#b87333"
          transmission={1}
          transparent
          opacity={1}
          metalness={0.6}
          roughness={0.05}
          ior={1.5}
          thickness={2}
          clearcoat={1}
          fog={false}
          resolution={transmissionResolution}
          samples={2}
        />
      </mesh>
    </group>
  );
}

/** Premium desktop-only scene: copper/water pipe + industrial HDRI + cinematic post-processing. */
export default function GlassPipeScene() {
  return (
    <>
      <Environment preset="warehouse" background={false} environmentIntensity={0.5} />
      <CopperPipe />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.4} intensity={1.2} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.65} />
      </EffectComposer>
    </>
  );
}
