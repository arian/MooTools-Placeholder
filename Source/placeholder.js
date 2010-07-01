/*
---
description: This simple plugin provides HTML 5 placeholder attribute to all browsers.

license: MIT-style

authors:
- Alexey Gromov
- Arian Stolwijk
- Sean McArthur

requires:
- core/1.2.4: '*'

provides: [Element.MooPlaceholder,MooPlaceholder]

...
*/

Element.implement('MooPlaceholder',function(color){
	//if ('placeholder' in this) return;
	
	color = color ? color : '#aaa';
	
	var text = this.get('placeholder'),
		type = this.get('type'),
		that = this,
		pseudoClone;
		
	
	
	this.setStyle('color', color)
		.set('value',text)
		.addEvents({
		'focus': function(){
			if (this.get('value') == '' || this.get('value') == text) {
				this.setStyle('color', null);
				this.set('value','');
			}
		}.bind(this),
		
		'blur': function(){
			if (this.get('value') == '' || this.get('value') == text) {
				this.setStyle('color', color);
				this.set('value',text);
				if(pseudoClone) {
					pseudoClone.replaces(this);
				}
			}
			
		}.bind(this)
	});
		
	if(type == 'password') {
		pseudoClone = new Element('input');
		['name','id', 'class', 'value', 'style'].forEach(function(attr) {
			pseudoClone.set(attr, that.get(attr));
		});
		pseudoClone.addEvent('focus', function() {
			that.replaces(pseudoClone).focus();
			that.focus();
		});
		pseudoClone.set('type', 'text');
		pseudoClone.replaces(this);
	}
	
	var form = this.getParent('form');
	if (form) {
		form.addEvent('submit', function(){
			if (this.get('value') == text) 
				this.set('value','');
		}.bind(this));
	}
	
});

var MooPlaceholder = function(color,selector){
	selector = selector ? selector : 'input';
	$$(selector).MooPlaceholder(color);
};
