"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;

  float wave(vec2 p, float t) {
    float e = 0.0;
    e += sin(p.x * 2.2 + t * 0.25) * 0.16;
    e += sin(p.y * 2.9 - t * 0.18) * 0.13;
    e += sin((p.x + p.y) * 1.6 + t * 0.12) * 0.11;
    e += sin((p.x - p.y) * 3.4 + t * 0.3) * 0.07;
    e += sin(p.x * 5.1 - t * 0.4) * 0.05;
    e += sin(p.y * 4.3 + t * 0.35) * 0.04;

    float mouseDist = distance(p, uMouse);
    e += exp(-mouseDist * mouseDist * 0.35) * 0.9;

    return e;
  }

  void main() {
    vec3 pos = position;
    float eps = 0.06;

    float e = wave(pos.xy, uTime);
    float eX = wave(pos.xy + vec2(eps, 0.0), uTime);
    float eY = wave(pos.xy + vec2(0.0, eps), uTime);

    pos.z += e;

    vec3 tangentX = normalize(vec3(eps, 0.0, eX - e));
    vec3 tangentY = normalize(vec3(0.0, eps, eY - e));
    vec3 objectNormal = normalize(cross(tangentX, tangentY));

    vElevation = e;
    vNormal = normalize(normalMatrix * objectNormal);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uBase;
  uniform vec3 uAccentA;
  uniform vec3 uAccentB;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 1.4);

    vec3 lightDir = normalize(vec3(0.4, 0.6, 1.0));
    float diffuse = max(dot(normal, lightDir), 0.0);
    float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 48.0);

    float mixFactor = smoothstep(-1.0, 1.0, sin(uTime * 0.07 + vElevation * 3.0));
    vec3 accent = mix(uAccentA, uAccentB, mixFactor);

    vec3 color = uBase;
    color += accent * 0.09;
    color += accent * fresnel * 1.6;
    color += accent * diffuse * 0.3;
    color += vec3(0.95, 1.0, 1.0) * specular * 0.9;

    gl_FragColor = vec4(color, 1.0);
  }
`;

class LiquidMetalMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uBase: { value: new THREE.Color("#020617") },
        uAccentA: { value: new THREE.Color("#0AA8C2") },
        uAccentB: { value: new THREE.Color("#C08A52") },
      },
      vertexShader,
      fragmentShader,
    });
  }
}

function LiquidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(() => new LiquidMetalMaterial(), []);
  const mouseTarget = useRef(new THREE.Vector2());
  const mouseSmoothed = useRef(new THREE.Vector2());
  const { viewport } = useThree();

  useFrame((state, delta) => {
    material.uniforms.uTime.value += delta;

    mouseTarget.current.set(
      state.pointer.x * viewport.width * 0.5,
      state.pointer.y * viewport.height * 0.5
    );
    mouseSmoothed.current.lerp(mouseTarget.current, Math.min(1, delta * 2.5));
    material.uniforms.uMouse.value.copy(mouseSmoothed.current);

    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y = THREE.MathUtils.lerp(
      mesh.rotation.y,
      state.pointer.x * 0.06,
      delta * 3
    );
    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      -state.pointer.y * 0.04,
      delta * 3
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 1.3, viewport.height * 1.3, 80, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export function BackgroundCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <color attach="background" args={["#020617"]} />
      <LiquidPlane />
    </Canvas>
  );
}
