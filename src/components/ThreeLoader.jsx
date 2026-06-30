import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeLoader({ onComplete }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef(null);

  // Simulate loading progress
  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      
      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.03);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffe57f, 1.5); // Warm gold tint
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x4caf50, 0.8); // Leaf green soft rim
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 10);
    pointLight.position.set(0, 1.5, 0);
    scene.add(pointLight);

    // 1. Procedural Brass Uruli (South Indian Vessel)
    // Create profiles using LatheGeometry
    const points = [];
    // Defining points for wide mouth, curved lip, and rounded base
    points.push(new THREE.Vector2(0, 0));       // base center
    points.push(new THREE.Vector2(1.5, 0.1));   // base radius
    points.push(new THREE.Vector2(2.5, 0.4));   // curve out
    points.push(new THREE.Vector2(3.0, 1.0));   // widest point
    points.push(new THREE.Vector2(2.8, 1.5));   // lip neck
    points.push(new THREE.Vector2(3.1, 1.7));   // outer lip top
    points.push(new THREE.Vector2(3.0, 1.8));   // inner lip top
    points.push(new THREE.Vector2(2.7, 1.5));   // inner wall curve
    points.push(new THREE.Vector2(1.8, 0.8));   // inner wall bottom
    points.push(new THREE.Vector2(0, 0.6));     // inner center

    const latheGeometry = new THREE.LatheGeometry(points, 32);
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xaa7c11,
      roughness: 0.25,
      metalness: 0.9,
      bumpScale: 0.05,
      side: THREE.DoubleSide
    });
    const uruli = new THREE.Mesh(latheGeometry, brassMaterial);
    uruli.position.set(0, -1, 0);
    scene.add(uruli);

    // Add handles to Uruli (TorusGeometry)
    const handleGeo = new THREE.TorusGeometry(0.4, 0.08, 8, 24);
    const handleL = new THREE.Mesh(handleGeo, brassMaterial);
    handleL.position.set(-3.05, 0.6, 0);
    handleL.rotation.y = Math.PI / 2;
    uruli.add(handleL);

    const handleR = handleL.clone();
    handleR.position.x = 3.05;
    uruli.add(handleR);

    // Add water plane inside Uruli
    const waterGeo = new THREE.CircleGeometry(2.7, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x004d40,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.55;
    uruli.add(water);

    // Glowing flower inside the Uruli (for traditional look)
    const flowerGroup = new THREE.Group();
    const petalGeo = new THREE.SphereGeometry(0.2, 8, 8);
    petalGeo.scale(1, 0.2, 2);
    const petalMat = new THREE.MeshStandardMaterial({ color: 0xffeb3b, roughness: 0.6 }); // yellow marigold petals
    for (let i = 0; i < 8; i++) {
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.rotation.y = (i * Math.PI) / 4;
      petal.position.x = Math.sin((i * Math.PI) / 4) * 0.3;
      petal.position.z = Math.cos((i * Math.PI) / 4) * 0.3;
      flowerGroup.add(petal);
    }
    const centerGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xe65100, roughness: 0.8 });
    const center = new THREE.Mesh(centerGeo, centerMat);
    center.position.y = 0.05;
    flowerGroup.add(center);
    flowerGroup.position.set(0, 0.6, 0);
    uruli.add(flowerGroup);

    // 2. Procedural Spices
    const spices = [];
    const numSpices = 35;

    // Cardamom geometry
    const cardamomGeo = new THREE.SphereGeometry(0.15, 8, 8);
    cardamomGeo.scale(1, 1, 1.8);
    const cardamomMat = new THREE.MeshStandardMaterial({ color: 0x81c784, roughness: 0.8, metalness: 0.1 });

    // Star Anise group
    const createStarAniseGroup = () => {
      const group = new THREE.Group();
      const petalGeo = new THREE.ConeGeometry(0.08, 0.4, 4);
      petalGeo.rotateX(Math.PI / 2);
      const starMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9, metalness: 0.05 });
      for (let i = 0; i < 8; i++) {
        const cone = new THREE.Mesh(petalGeo, starMat);
        cone.rotation.y = (i * Math.PI) / 4;
        cone.position.x = Math.sin((i * Math.PI) / 4) * 0.2;
        cone.position.z = Math.cos((i * Math.PI) / 4) * 0.2;
        group.add(cone);
      }
      return group;
    };

    // Curry Leaf geometry
    const leafGeo = new THREE.BoxGeometry(0.2, 0.02, 0.4);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.5, side: THREE.DoubleSide });

    for (let i = 0; i < numSpices; i++) {
      let spiceMesh;
      const rand = Math.random();
      
      if (rand < 0.35) {
        spiceMesh = new THREE.Mesh(cardamomGeo, cardamomMat);
      } else if (rand < 0.7) {
        spiceMesh = createStarAniseGroup();
      } else {
        spiceMesh = new THREE.Mesh(leafGeo, leafMat);
      }

      // Initial positions: scattered in a cylinder around & above the Uruli
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -3 - Math.random() * 6; // start low, float up

      spiceMesh.position.set(x, y, z);
      spiceMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      // Animation parameters
      const speed = 0.02 + Math.random() * 0.03;
      const rotSpeedX = (Math.random() - 0.5) * 0.02;
      const rotSpeedY = (Math.random() - 0.5) * 0.02;
      const driftSpeed = 0.01 + Math.random() * 0.01;
      const driftSeed = Math.random() * 100;
      
      spices.push({
        mesh: spiceMesh,
        speed,
        rotSpeedX,
        rotSpeedY,
        driftSpeed,
        driftSeed,
        initialRadius: radius,
        angle
      });
      scene.add(spiceMesh);
    }

    // 3. Central AGKS Glowing Gold Logo disk (hidden initially, reveals at completion)
    const logoDiskGeo = new THREE.RingGeometry(0.1, 1.0, 32);
    const logoDiskMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const logoMesh = new THREE.Mesh(logoDiskGeo, logoDiskMat);
    logoMesh.position.set(0, 1.8, 0);
    logoMesh.rotation.x = -Math.PI / 6; // slightly tilted for visual beauty
    scene.add(logoMesh);

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let localProgress = 0;
    let cameraDivePhase = false;
    let diveAlpha = 0;

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Interpolate progress smoothly
      setProgress((prev) => {
        localProgress = prev;
        return prev;
      });

      const currentProgressRatio = localProgress / 100;

      // Slowly rotate Uruli
      uruli.rotation.y += 0.003;

      // Animate spices
      spices.forEach((spice, index) => {
        // Basic float upwards
        spice.mesh.position.y += spice.speed;

        // Wave/drift motion
        const time = Date.now() * 0.001;
        const driftX = Math.sin(time * spice.driftSpeed + spice.driftSeed) * 0.015;
        const driftZ = Math.cos(time * spice.driftSpeed + spice.driftSeed) * 0.015;
        spice.mesh.position.x += driftX;
        spice.mesh.position.z += driftZ;

        // Rotations
        spice.mesh.rotation.x += spice.rotSpeedX;
        spice.mesh.rotation.y += spice.rotSpeedY;

        // Reset if it goes too high (and we are not in converge stage)
        if (spice.mesh.position.y > 6 && currentProgressRatio < 0.75) {
          spice.mesh.position.y = -4;
          const angle = Math.random() * Math.PI * 2;
          spice.mesh.position.x = Math.cos(angle) * spice.initialRadius;
          spice.mesh.position.z = Math.sin(angle) * spice.initialRadius;
        }

        // Antigravity Spices swirl and converge:
        // As progress goes from 75% to 98%, pull spices towards the center of the Uruli and spin faster
        if (currentProgressRatio >= 0.7) {
          const convergeFactor = Math.min(1, (currentProgressRatio - 0.7) / 0.25); // 0 to 1
          
          // Speed up floating upwards
          spice.mesh.position.y += spice.speed * convergeFactor * 2;
          
          // Spiral inwards
          const targetX = 0;
          const targetZ = 0;
          const targetY = 1.8; // center above Uruli
          
          spice.mesh.position.x = THREE.MathUtils.lerp(spice.mesh.position.x, targetX, 0.04 * convergeFactor);
          spice.mesh.position.z = THREE.MathUtils.lerp(spice.mesh.position.z, targetZ, 0.04 * convergeFactor);
          spice.mesh.position.y = THREE.MathUtils.lerp(spice.mesh.position.y, targetY, 0.04 * convergeFactor);
          
          // Spin around Y axis
          spice.angle += 0.05 * convergeFactor;
          const spiralRad = THREE.MathUtils.lerp(spice.initialRadius, 0.1, convergeFactor);
          spice.mesh.position.x = Math.cos(spice.angle) * spiralRad;
          spice.mesh.position.z = Math.sin(spice.angle) * spiralRad;

          // Scale down as they converge
          const scale = 1 - 0.9 * convergeFactor;
          spice.mesh.scale.set(scale, scale, scale);
        }
      });

      // Show glowing logo as progress approaches 90%+
      if (currentProgressRatio >= 0.85) {
        const logoAlpha = Math.min(1, (currentProgressRatio - 0.85) / 0.12);
        logoDiskMat.opacity = logoAlpha * 0.8;
        logoMesh.rotation.y += 0.015;
      }

      // Camera Dive Phase (99% to 100%)
      if (localProgress >= 99) {
        cameraDivePhase = true;
      }

      if (cameraDivePhase) {
        diveAlpha += 0.02; // speed of camera dive
        if (diveAlpha <= 1) {
          // Move camera into the Uruli
          camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, diveAlpha);
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2, diveAlpha);
          camera.position.z = THREE.MathUtils.lerp(camera.position.z, 0, diveAlpha);
          camera.lookAt(0, 0, 0);

          // Fog gets thicker as we dive
          scene.fog.density = THREE.MathUtils.lerp(0.03, 1.2, diveAlpha);
        } else {
          // Completed the transition!
          cancelAnimationFrame(requestRef.current);
          onComplete();
          return;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      if (renderer && renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // dispose Three resources
      latheGeometry.dispose();
      brassMaterial.dispose();
      handleGeo.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      centerGeo.dispose();
      centerMat.dispose();
      cardamomGeo.dispose();
      cardamomMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      logoDiskGeo.dispose();
      logoDiskMat.dispose();
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loader-canvas" ref={mountRef} />
      
      <div className="loader-overlay-ui">
        <img 
          src="/logo_chef.jpg" 
          alt="AGKS Logo" 
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            border: '2px solid var(--color-gold)',
            boxShadow: '0 0 25px rgba(212,175,55,0.6)',
            marginBottom: '1.25rem',
            objectFit: 'cover',
            animation: 'fadeIn 1.2s ease forwards, floatIcon 4s ease-in-out infinite'
          }}
        />
        <h2 className="loader-title">AGKS CATERING</h2>
        <p className="loader-subtitle">The Modern Tradition</p>
        
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        
        <p style={{ marginTop: '0.5rem', color: '#D4AF37', fontSize: '0.85rem', letterSpacing: '1px' }}>
          {progress}% Loading Experience...
        </p>

        <button 
          className="loader-skip-btn" 
          onClick={onComplete}
        >
          Skip Experience
        </button>
      </div>
    </div>
  );
}
