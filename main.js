$(document).ready(function () {

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