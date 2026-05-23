import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TECH_LOGOS = [
  { name: 'React.js', url: 'https://img.icons8.com/color/96/000000/react-native.png', size: 1.1 },
  { name: 'HTML5', url: 'https://img.icons8.com/color/96/000000/html-5.png', size: 1.0 },
  { name: 'CSS3', url: 'https://img.icons8.com/color/96/000000/css3.png', size: 1.0 },
  { name: 'Tailwind', url: 'https://img.icons8.com/color/96/000000/tailwindcss.png', size: 1.0 },
  { name: 'JavaScript', url: 'https://img.icons8.com/color/96/000000/javascript.png', size: 1.0 },
  { name: 'Node.js', url: 'https://img.icons8.com/color/96/000000/nodejs.png', size: 1.0 },
  { name: 'Express.js', url: 'https://img.icons8.com/ios-filled/96/ffffff/express-js.png', size: 1.0 },
  { name: 'MongoDB', url: 'https://img.icons8.com/color/96/000000/mongodb.png', size: 1.0 },
  { name: 'MySQL', url: 'https://img.icons8.com/color/96/000000/mysql-logo.png', size: 1.0 },
  { name: 'Java', url: 'https://img.icons8.com/color/96/000000/java-coffee-cup-logo.png', size: 1.0 },
  { name: 'Python', url: 'https://img.icons8.com/color/96/000000/python.png', size: 1.0 },
  { name: 'DSA', url: 'https://img.icons8.com/fluency/48/graph.png', size: 0.95 },
  { name: 'C', url: 'https://img.icons8.com/color/96/000000/c-programming.png', size: 1.0 },
  { name: 'C++', url: 'https://img.icons8.com/color/96/000000/c-plus-plus-logo.png', size: 1.0 },
  { name: 'Github', url: 'https://img.icons8.com/material-outlined/96/ffffff/github.png', size: 1.0 },
  { name: 'Camera', url: 'https://img.icons8.com/fluency/48/camera.png', size: 0.95 },
];

const SkillsCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, canvas.clientWidth / canvas.clientHeight || 3, 0.1, 100);
    camera.position.z = 11;

    const resize = () => {
      const w = canvas.clientWidth || 900;
      const h = canvas.clientHeight || 380;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);
    setTimeout(resize, 100);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    const logos = [];

    TECH_LOGOS.forEach((tech, i) => {
      loader.load(
        tech.url,
        texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
          });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(tech.size, tech.size, 1);
          scene.add(sprite);
          logos[i] = sprite;
        },
        undefined,
        () => {
          console.log('Failed to load:', tech.url); // Debug log for failed loads
          const fallback = new THREE.Sprite(
            new THREE.SpriteMaterial({
              color: 0x00f5ff,
              transparent: true,
              opacity: 0.8,
              depthWrite: false,
            })
          );
          fallback.scale.set(0.55, 0.55, 1);
          scene.add(fallback);
          logos[i] = fallback;
        }
      );
    });

    let t = 0;
    let animId;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.004;
      logos.forEach((sprite, i) => {
        if (!sprite) return;
        const total = TECH_LOGOS.length;
        const phi = Math.acos(1 - 2 * ((i + 0.5) / total)) + Math.sin(t * 1.2 + i * 0.35) * 0.12;
        const theta = i * goldenAngle + t * 0.65;
        const radius = 4.6 + Math.sin(t + i * 0.9) * 0.35;
        sprite.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );

        const baseScale = TECH_LOGOS[i].size;
        const pulse = 1 + Math.sin(t * 2.6 + i) * 0.08;
        sprite.scale.set(baseScale * pulse, baseScale * pulse, 1);
      });
      scene.rotation.y = t * 0.12;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      logos.forEach(sprite => {
        if (!sprite) return;
        if (sprite.material?.map) {
          sprite.material.map.dispose();
        }
        sprite.material.dispose();
        scene.remove(sprite);
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default SkillsCanvas;
