import Component, { tracked } from "@glimmer/component";

export default class GlimmerDemo extends Component {
    slides;
    index;

    @tracked body;
    @tracked title;

    constructor(options) {
        super(options);

        this.index = 0;

        this.loadSlides();
    }

    loadFirstSlide() {
        if (this.slides) {
            this.title = this.slides[this.index].title;
            this.body = this.slides[this.index].body;
        }
    }

    loadSlides() {
        fetch('http://localhost:4200/data/slides.json')
            .then(request => request.json())
            .then(({ content }) => this.slides = content)
            .then(() => this.loadFirstSlide())
            .catch(() => this.title = 'No slide content');
    }

    slideBack() {
        if (this.index <= 0) {
            this.index = 0;
        } else {
            this.index = this.index - 1;
        }

        this.title = this.slides[this.index].title;
        this.body = this.slides[this.index].body;
    }

    slideForward() {
        if ((this.index + 1) === this.slides.length) {
            this.index = 0;
        } else {
            this.index = this.index + 1;
        }

        this.title = this.slides[this.index].title;
        this.body = this.slides[this.index].body;
    }
}
