# maquette-navstack
A small, simple es6 class to be used as a navigation stack for Maquette JS applications.

___
While this can be applied in other situations, I use it primarily in Apache Cordova applications along with Maquette JS.  It is just a simple navigation stack that allows pushing and popping [_Components_](http://maquettejs.org/docs/component-approach.html).  This is used in single page applications that don't use anchors/links to change urls, but rather change the divs in the viewport.  Currently using [Browserify](http://browserify.org) to require the module.

There are pre-requisites with each component for the Router to work:
* Must contain a `render()` method that returns a DOM representation of the component (Just like Maquette's `renderMaquette()` method).
* Must contain a string property `id` that describes the component's viewport div.  e.g.: 
```javascript
class Home {
	constructor() {
		this.id = 'home-screen';
	}
	render() {
		return h('div#home-screen.screen');
	}
}
```
This ensures that the Router can find it in the DOM and assign the appropriate classes for transitions. These classes can be seen in the [screen.scss](/screen.scss) file.

* The `render()` method must return the component in its initial location so that when Maquette renders it, it is out of the viewport and can transition in.
e.g.:
```javascript
render() {
	return h('div#test.screen.right');
}
```
___
### Methods

`refresh()`
* Use to force Maquette to re-render through `Projector.scheduleRender()`.

`navigateForward(<component>)`
* Use to show the passed in component from the right - transitioning the current showing component to the left.
* Use it with a component with the class name `.screen.right`.

`navigateBack()`
* Use to show the previous component in the navigation stack.

`presentModal(<component>)`
* Use to show the passed in component from the bottom - keeping the current showing component in its position (just like a modal popup).
* Use it with a component with the class name `.screen.bottom`.

`startLoading()` and `stopLoading()`
* Use to show or hide a loading indicator.  The indicator is appended onto the document body through the Projector or removed completely from the DOM. 
