$( document ).ready(function() {
    let elements = document.querySelectorAll(".rolling-text");

    elements.forEach((element) => {
        let innerText = element.innerText;
        element.innerHTML = "";
    
        let textContainer = document.createElement("div");
        textContainer.classList.add("block");
    
        for (let letter of innerText) {
            let span = document.createElement("span");
            span.innerText = letter.trim() === "" ? "\xa0" : letter;
            span.classList.add("letter");
            textContainer.appendChild(span);
        }
    
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });
    
    elements.forEach((element) => {
    
        let currentImage = ''
    
        element.addEventListener("mouseover", () => {
            let imageIndex = element.dataset.image;
            currentImage = document.getElementById(imageIndex)
            currentImage.classList.add('current')
            let tl = gsap.to(currentImage, {
                duration: .4,
                transform: 'translate(0)',
                opacity: .8,
            })
        });
    
        element.addEventListener('mouseout', (e) => {
            let tl = gsap.to(currentImage, {
                duration: .4,
                transform: 'translate(0, 50px)',
                opacity: 0
            })
        })
    });
    
    function pageTransition() {
        var tl = gsap.timeline()
    }
    
    function contentAnimation() {
        var tl = gsap.timeline()
    }
    
    function delay(n) {
        n = n || 2000;
        return new Promise(done => {
            setTimeout(() => {
                done()
            }, n)
        })
    }
    
    barba.init({
        sync: true,
        transitions: [{
            async leave(data) {
                const done = this.async()
                pageTransition()
                await delay(1500)
                done()
            },
            async enter(data) {
                contentAnimation();
            },
            async once(data) {
                contentAnimation()
            }
        }]
    });
    
})