// Three.js Scene Setup
let scene, camera, renderer, controls;
let tubes = [];
let selectedTube = null;
let history = [];
let historyIndex = -1;
let raycaster, mouse;

// Initialize the application
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.set(300, 300, 300);
    camera.lookAt(0, 0, 0);

    // Renderer
    const container = document.getElementById('canvas-container');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    scene.add(directionalLight);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(500, 50, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // Controls
    setupOrbitControls();

    // Raycaster for selection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Event Listeners
    setupEventListeners();

    // Animation Loop
    animate();
}

// Orbit Controls (manual implementation)
function setupOrbitControls() {
    let isDragging = false;
    let isPanning = false;
    let previousMousePosition = { x: 0, y: 0 };

    renderer.domElement.addEventListener('mousedown', (e) => {
        if (e.button === 0) isDragging = true;
        if (e.button === 2) isPanning = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            const rotationSpeed = 0.005;
            
            // Rotate camera around scene
            const radius = camera.position.length();
            const theta = Math.atan2(camera.position.x, camera.position.z);
            const phi = Math.acos(camera.position.y / radius);

            const newTheta = theta - deltaX * rotationSpeed;
            const newPhi = Math.max(0.1, Math.min(Math.PI - 0.1, phi + deltaY * rotationSpeed));

            camera.position.x = radius * Math.sin(newPhi) * Math.sin(newTheta);
            camera.position.y = radius * Math.cos(newPhi);
            camera.position.z = radius * Math.sin(newPhi) * Math.cos(newTheta);
            camera.lookAt(0, 0, 0);
        }

        if (isPanning) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            const panSpeed = 0.5;
            const right = new THREE.Vector3();
            const up = new THREE.Vector3(0, 1, 0);
            
            camera.getWorldDirection(right);
            right.cross(up).normalize();

            camera.position.addScaledVector(right, -deltaX * panSpeed);
            camera.position.y += deltaY * panSpeed;
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mouseup', () => {
        isDragging = false;
        isPanning = false;
    });

    renderer.domElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.1;
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        
        if (e.deltaY < 0) {
            camera.position.addScaledVector(direction, 20);
        } else {
            camera.position.addScaledVector(direction, -20);
        }
    });

    renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
}

// Create Tube Geometry
function createTube(params) {
    const { width, height, thickness, length, type } = params;
    
    // Adjust for square type
    const w = type === 'square' ? Math.max(width, height) : width;
    const h = type === 'square' ? Math.max(width, height) : height;

    // Create hollow rectangular tube using CSG-like approach
    const outerGeometry = new THREE.BoxGeometry(w, h, length);
    const innerGeometry = new THREE.BoxGeometry(
        w - thickness * 2,
        h - thickness * 2,
        length + 2
    );

    const material = new THREE.MeshPhongMaterial({
        color: 0x4a9eff,
        side: THREE.DoubleSide
    });

    // Create tube mesh (simplified - using outer box for now)
    const tube = new THREE.Mesh(outerGeometry, material);
    
    // Add edges for better visualization
    const edges = new THREE.EdgesGeometry(outerGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    tube.add(wireframe);

    tube.userData = {
        width: w,
        height: h,
        thickness,
        length,
        type
    };

    return tube;
}

// Add Tube to Scene
function addTube() {
    const params = {
        width: parseFloat(document.getElementById('tubeWidth').value),
        height: parseFloat(document.getElementById('tubeHeight').value),
        thickness: parseFloat(document.getElementById('tubeThickness').value),
        length: parseFloat(document.getElementById('tubeLength').value),
        type: document.getElementById('tubeType').value
    };

    const tube = createTube(params);
    
    // Position new tube
    if (tubes.length === 0) {
        tube.position.set(0, 0, 0);
    } else {
        const angle = parseFloat(document.getElementById('jointAngle').value);
        const lastTube = tubes[tubes.length - 1];
        
        // Position at end of last tube with angle
        const angleRad = (angle * Math.PI) / 180;
        const distance = lastTube.userData.length / 2 + params.length / 2;
        
        tube.position.copy(lastTube.position);
        tube.position.x += distance * Math.cos(angleRad);
        tube.position.z += distance * Math.sin(angleRad);
        tube.rotation.y = angleRad;

        // Create joint visualization
        if (document.getElementById('showJoints').checked) {
            createJoint(lastTube.position, tube.position);
        }
    }

    scene.add(tube);
    tubes.push(tube);
    saveState();
}

// Create Joint Visualization
function createJoint(pos1, pos2) {
    const midPoint = new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(0.5);
    const jointGeometry = new THREE.SphereGeometry(8, 16, 16);
    const jointMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff6b6b,
        transparent: true,
        opacity: 0.7
    });
    const joint = new THREE.Mesh(jointGeometry, jointMaterial);
    joint.position.copy(midPoint);
    joint.userData.isJoint = true;
    scene.add(joint);
}

// Clear All Tubes
function clearAll() {
    tubes.forEach(tube => scene.remove(tube));
    tubes = [];
    
    // Remove joints
    scene.children.filter(child => child.userData.isJoint).forEach(joint => {
        scene.remove(joint);
    });
    
    saveState();
}

// Undo/Redo System
function saveState() {
    const state = tubes.map(tube => ({
        position: tube.position.clone(),
        rotation: tube.rotation.clone(),
        userData: { ...tube.userData }
    }));
    
    history = history.slice(0, historyIndex + 1);
    history.push(state);
    historyIndex++;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState(history[historyIndex]);
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreState(history[historyIndex]);
    }
}

function restoreState(state) {
    clearAll();
    state.forEach(tubeData => {
        const tube = createTube(tubeData.userData);
        tube.position.copy(tubeData.position);
        tube.rotation.copy(tubeData.rotation);
        scene.add(tube);
        tubes.push(tube);
    });
}

// Toggle Wireframe
function toggleWireframe(enabled) {
    tubes.forEach(tube => {
        tube.material.wireframe = enabled;
    });
}

// Event Listeners Setup
function setupEventListeners() {
    document.getElementById('addTube').addEventListener('click', addTube);
    document.getElementById('clearAll').addEventListener('click', clearAll);
    document.getElementById('undo').addEventListener('click', undo);
    document.getElementById('redo').addEventListener('click', redo);
    
    document.getElementById('wireframe').addEventListener('change', (e) => {
        toggleWireframe(e.target.checked);
    });

    document.getElementById('tubeType').addEventListener('change', (e) => {
        if (e.target.value === 'square') {
            const maxDim = Math.max(
                parseFloat(document.getElementById('tubeWidth').value),
                parseFloat(document.getElementById('tubeHeight').value)
            );
            document.getElementById('tubeWidth').value = maxDim;
            document.getElementById('tubeHeight').value = maxDim;
        }
    });

    window.addEventListener('resize', onWindowResize);
}

// Set Angle Preset
function setAngle(angle) {
    document.getElementById('jointAngle').value = angle;
}

// Window Resize Handler
function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
window.setAngle = setAngle;
