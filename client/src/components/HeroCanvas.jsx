import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = [0x00f5ff, 0x06d6a0, 0x7c3aed, 0xc792ea, 0xffd166, 0xff6b6b];

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);
    resize();

    // Floating CS-themed wireframe nodes
    const shapes = [];
    for (let i = 0; i < 22; i++) {
      const geoType = i % 3;
      const geo =
        geoType === 0 ? new THREE.IcosahedronGeometry(0.18 + Math.random() * 0.18, 0) :
        geoType === 1 ? new THREE.OctahedronGeometry(0.22 + Math.random() * 0.14, 0) :
                        new THREE.TetrahedronGeometry(0.2 + Math.random() * 0.16, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: COLORS[i % COLORS.length],
        wireframe: true,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 6 - 4
      );
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.008,
        ry: (Math.random() - 0.5) * 0.012,
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Central torus knot — algorithm symbol
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.2, 0.25, 96, 12),
      new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.08 })
    );
    torusKnot.position.set(3.5, 0, -3);
    scene.add(torusKnot);

    // Orbit ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.02, 4, 80),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.2 })
    );
    ring.position.set(3.5, 0, -3);
    ring.rotation.x = Math.PI / 4;
    scene.add(ring);

    // Ground grid
    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 20, 30, 20),
      new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.03 })
    );
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -5;
    scene.add(grid);

    // Mouse parallax
    let tx = 0, ty = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 1.5;
      ty = (e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    document.addEventListener('mousemove', onMove);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      shapes.forEach(s => {
        s.rotation.x += s.userData.rx;
        s.rotation.y += s.userData.ry;
        s.position.x += s.userData.vx;
        s.position.y += s.userData.vy;
        if (Math.abs(s.position.x) > 12) s.userData.vx *= -1;
        if (Math.abs(s.position.y) > 8) s.userData.vy *= -1;
      });
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.005;
      ring.rotation.z += 0.003;
      scene.rotation.x += (ty * 0.025 - scene.rotation.x) * 0.06;
      scene.rotation.y += (tx * 0.04 - scene.rotation.y) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default HeroCanvas;
