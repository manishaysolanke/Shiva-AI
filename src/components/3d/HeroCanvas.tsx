"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 3. Particle Starfield
    const particlesCount = 380;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color("#38bdf8"); // Cyan
    const color2 = new THREE.Color("#a855f7"); // Purple
    const color3 = new THREE.Color("#ec4899"); // Pink

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(geometry, particleMaterial);
    scene.add(particlesMesh);

    // 4. Floating 3D Geometric Objects (Icosahedron, Torus, Octahedron)
    const objects: THREE.Mesh[] = [];

    const geom1 = new THREE.IcosahedronGeometry(2.5, 0);
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh1 = new THREE.Mesh(geom1, mat1);
    mesh1.position.set(-18, 8, -5);
    scene.add(mesh1);
    objects.push(mesh1);

    const geom2 = new THREE.TorusGeometry(3, 0.4, 16, 50);
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const mesh2 = new THREE.Mesh(geom2, mat2);
    mesh2.position.set(18, -6, -8);
    scene.add(mesh2);
    objects.push(mesh2);

    const geom3 = new THREE.OctahedronGeometry(2, 0);
    const mat3 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const mesh3 = new THREE.Mesh(geom3, mat3);
    mesh3.position.set(15, 12, -10);
    scene.add(mesh3);
    objects.push(mesh3);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    // 6. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX * 4 - targetX) * 0.05;
      targetY += (-mouseY * 4 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate particle field slowly
      particlesMesh.rotation.y = elapsedTime * 0.03;
      particlesMesh.rotation.x = elapsedTime * 0.015;

      // Float & rotate 3D objects
      mesh1.rotation.x = elapsedTime * 0.4;
      mesh1.rotation.y = elapsedTime * 0.3;
      mesh1.position.y = 8 + Math.sin(elapsedTime * 0.8) * 1.5;

      mesh2.rotation.x = elapsedTime * 0.2;
      mesh2.rotation.y = elapsedTime * 0.5;
      mesh2.position.y = -6 + Math.cos(elapsedTime * 0.7) * 1.5;

      mesh3.rotation.z = elapsedTime * 0.3;
      mesh3.rotation.y = elapsedTime * 0.4;
      mesh3.position.y = 12 + Math.sin(elapsedTime * 0.6) * 1.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
