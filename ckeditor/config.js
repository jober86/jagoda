/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	        
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                { name: 'colors' },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links',    groups: [ 'insert' ]  },					
                { name: 'others' },
		{ name: 'forms' },	
                { name: 'about' },
                { name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },				
                '/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },                
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' }				
	];

        config.allowedContent = true;
        
        config.format_tags = 'p;h1;h2;h3';
        
        config.language = 'pl';   
        
        config.removeButtons = 'Underline,Subscript,Superscript,Table,BGColor,PasteFromWord,Anchor';
        
        config.removePlugins = '';
        
        config.contentsCss = CKEDITOR.basePath  + '../../css/admin/cke_style.css';

//        config.image2_alignClasses = [ 'align-left', 'align-center', 'align-right' ];
        
        config.colorButton_colors = '0092bd,e75095,f0b323,FFF,6a123a,acacac';
   
        config.filebrowserBrowseUrl = CKEDITOR.basePath  + 'imgmanager/backend.php?__plugin=ImageManager&__function=manager';
        
//        config.filebrowserImageUploadUrl = '/ckfinder/ckfinder.html?Type=Images';
        
     
//        config.format_h1 = { element: 'h1', attributes: { 'class': 'h1' } };
//        config.format_h2 = { element: 'h2', attributes: { 'class': 'h2' } };
//        config.format_h3 = { element: 'h3', attributes: { 'class': 'h3' } };
        
        config.stylesSet = [
            // Block-level styles
            { name: 'Page Title', element: 'h3', attributes: {'class':'page_title'} },                        

            // Inline styles
            { name: 'Button', element: 'button', attributes: { 'class': 'btn btn-block orange' } },
            
        ];
};
