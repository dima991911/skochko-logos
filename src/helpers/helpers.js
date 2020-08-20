function SmoothScroll(target, speed, smooth) {
    if (target === document)
        this.target = (document.scrollingElement
            || document.documentElement
            || document.body.parentNode
            || document.body);
    else this.target = target;

    this.moving = false;
    this.disable = false;
    this.pos = this.target.scrollTop;
    this.frame = this.target === document.body
    && document.documentElement
        ? document.documentElement
        : this.target;

    const scrolled = (e) => {
        e.preventDefault();

        if (!this.disable) {
            let delta = normalizeWheelDelta(e);

            this.pos += -delta * speed;
            this.pos = Math.max(0, Math.min(this.pos, this.target.scrollHeight - this.frame.clientHeight));
            if (!this.moving) update()
        }
    };

    this.target.addEventListener('scroll', scrolled, { passive: false });
    this.target.addEventListener('mousewheel', scrolled, { passive: false });
    this.target.addEventListener('DOMMouseScroll', scrolled, { passive: false });

    function normalizeWheelDelta(e) {
        if(e.detail) {
            if(e.wheelDelta)
                return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1);
            else
                return -e.detail / 3;
        } else
            return e.wheelDelta / 120;
    }

    const update = () => {
        this.moving = true;

        let delta = (this.pos - this.target.scrollTop) / smooth;

        this.target.scrollTop += delta;

        if (Math.abs(delta) > 0.7)
            requestFrame(update);
        else
            this.moving = false;
    };

    let requestFrame = function() {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(func) {
                window.setTimeout(func, 1000 / 50);
            }
        );
    }();

    this.setScrollPos = (pos) => {
        this.pos = pos;
    };

    this.setDisableScroll = (bool) => {
        this.disable = bool;
    };
}

function backendRequestsErrorHandler(response) {
    return response.json()
        .then(err => {
            throw new Error(err.error);
        });
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const newProjectInit = {
    backgroundColor: '#000',
    textColor: '#fff',
    preview: null,
    topSectionImg: null,
    name: null,
    slogan: null,
    description: null,
    websiteLink: null,
    images: [],
    feedback: null,
    clientName: null,
    bottomSectionImg: null,
};

export { SmoothScroll, backendRequestsErrorHandler, toBase64, newProjectInit };
