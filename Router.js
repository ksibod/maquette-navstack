const Maquette = require('maquette');
const Projector = Maquette.createProjector();


class Router {

    constructor() {        
        this._navstack = [];
        this._modalPresent = false;
    }
    
    refresh() {
        Projector.scheduleRender();
    }
    
    render(component) {
        Projector.append(document.body, component.render);
    }

    navigateForward(component) {
        this.render(component);
        setTimeout(() => {
            if (this._navstack.length) {
                let currentPage = document.getElementById(this._navstack[this._navstack.length-1].id);
                let newPage = document.getElementById(component.id);
                
                newPage.className = 'screen right';
                newPage.className = 'screen moving center';
                currentPage.className = 'screen moving left';
            }
            this._navstack.push(component);
        }, 50);
    }

    navigateBack() {
        if (this._navstack.length > 1) {
            let currentPage = document.getElementById(this._navstack[this._navstack.length - 1].id);
            if (this._modalPresent) {
                currentPage.className = 'screen moving bottom';
                this._modalPresent = false;
            }
            else {
                let newPage = document.getElementById(this._navstack[this._navstack.length - 2].id);

                newPage.className = 'screen left';
                newPage.className = 'screen moving center';
                currentPage.className = 'screen moving right';
            }
            currentPage.addEventListener('transitionend', () => {
                Projector.detach(this._navstack[this._navstack.length - 1].render);
                currentPage.remove();
                this._navstack.pop();
            });
        }

    }

    presentModal(component) {
        this.render(component);
        setTimeout(() => {
            if (this._navstack.length) {
                let newPage = document.getElementById(component.id);

                newPage.className = 'screen bottom';
                newPage.className = 'screen moving center';
            }
            this._navstack.push(component);
        }, 50);
        this._modalPresent = true;
    }

    startLoading() {
        Projector.append(document.body, () => {
          
            // Return your preference of loading animation here
            // Simple CSS example
            
            return Maquette.h('div#loading-screen', [
                Maquette.h('div.spinner', [
                    Maquette.h('div.bounce1'),
                    Maquette.h('div.bounce2'),
                    Maquette.h('div.bounce3')
                ])
            ])
        });
    }

    stopLoading() {
        document.getElementById('loading-screen').remove();
    }

}

module.exports = new Router();
