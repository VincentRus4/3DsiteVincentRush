
         import 'https://unpkg.com/three@0.126.1/examples/js/loaders/GLTFLoader.js'
            import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
        
           
            

            
            
            const scene = new THREE.Scene()
            //scene.rotation.y = 0,05;

            // const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
            // scene.add(gridHelper)

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

            const renderer = new THREE.WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(renderer.domElement)
            //var raycaster = new THREE.Raycaster();
            //var mouse = new THREE.Vector2();


            const loader = new THREE.TextureLoader();


          //globe

            const geometry = new THREE.SphereGeometry(1,64,32,0,)
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: true,
                side: THREE.BackSide
            })

            const cube = new THREE.Mesh(geometry, material)
            cube.position.set(0, 0.5, -10)
            scene.add(cube);

            

            //  //secoond
            //  const sgeometry = new THREE.ThorusGeometry(9,20,1,9,6)
            // const smaterial = new THREE.MeshBasicMaterial({
            //     color: 0x00ff00,
            //     // wireframe: true,
                
            // })

            // const mesh = new THREE.Mesh(sgeometry, smaterial)
            // mesh.position.set(5, 0.5, -180)
            // // Load Galaxy Textures
            // loader.crossOrigin = true;
            // loader.load(
            //   'ocean.jpg',
            //  function(texture) {
            //  smaterial.map = texture;
            //  scene.add(mesh);
            //  });


            window.addEventListener('resize', onWindowResize, false)
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
                renderer.setSize(window.innerWidth, window.innerHeight)
                render()
            }


            /* Liner Interpolation
             * lerp(min, max, ratio)
             * eg,
             * lerp(20, 60, .5)) = 40
             * lerp(-20, 60, .5)) = 20
             * lerp(20, 60, .75)) = 50
             * lerp(-20, -10, .1)) = -.19
             */
            function lerp(x, y, a) {
                return (1 - a) * x + a * y
            }

            // Used to fit the lerps to start and end at specific scrolling percentages
            function scalePercent(start, end) {
                return (scrollPercent - start) / (end - start)
            }

            const animationScripts = []

            //add an animation that flashes the cube through 100 percent of scroll
            animationScripts.push({
                start: 0,
                end: 101,
                func: () => {
                    
                    cube.rotation.y += 0.005
                    
                    
                },
            })

            //add an animation that moves the cube through first 40 percent of scroll
            animationScripts.push({
                start: 0,
                end: 40,
                func: () => {
                    camera.lookAt(cube.position)
                    camera.position.set(0, 1, 2)
                    //camera.scale.z =(7)
                    cube.position.z = lerp(5, 0, scalePercent(0, 40,60))
                    //console.log(cube.position.z)
                    // menu.style.marginLeft = value * -5 + 'px';
                },
            })

            //add an animation that rotates the cube between 40-60 percent of scroll
            animationScripts.push({
                start: 40,
                end: 60,
                func: () => {
                    
                   
                    // cube.position.z = lerp(6, 0, scalePercent(40, 60))
                    // camera.position.set(0,0,5 )
                    cube.rotation.z += 0.001
                    
                    
                    
                
                    
                    //console.log(cube.rotation.z)
                },
            })

            //add an animation that moves the camera between 60-80 percent of scroll
            animationScripts.push({
                start: 60,
                end: 80,
                func: () => {
                    camera.scale.z= (1)
                    camera.lookAt(cube.position)
                    camera.position.x = lerp(0, 5, scalePercent(60, 80))
                    camera.position.y = lerp(0, 5, scalePercent(60, 80))
                    
                    
                    camera.lookAt(cube.position)
              
                    console.log(camera.position.x + " " + camera.position.y)
                },
            })

            //add an animation that auto rotates the cube from 80 percent of scroll
            animationScripts.push({
                start: 80,
                end: 101,
                func: () => {
                    //auto rotate
                    
                    cube.rotation.x += 0.03
                    
                    cube.rotation.y += 0.07
                    

                },
            })

            function playScrollAnimations() {
                animationScripts.forEach((a) => {
                    if (scrollPercent >= a.start && scrollPercent < a.end) {
                        a.func()
                    }
                })
            }

            let scrollPercent = 0

            document.body.onscroll = () => {
                //calculate the current scroll progress as a percentage
                scrollPercent =
                    ((document.documentElement.scrollTop || document.body.scrollTop) /
                        ((document.documentElement.scrollHeight || document.body.scrollHeight) -
                            document.documentElement.clientHeight)) *
                    100
                // document.getElementById('scrollProgress').innerText =
                //     'Scroll Progress : ' + scrollPercent.toFixed(2)
            }

        


        

            function animate() {
                requestAnimationFrame(animate)

                playScrollAnimations()

                render()

            
            }

            function render() {
                renderer.render(scene, camera)
            }

            window.scrollTo({ top: 0, behavior: 'smooth' })
            animate()
 
        