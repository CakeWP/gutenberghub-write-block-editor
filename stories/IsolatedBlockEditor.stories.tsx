/**
 * Internal dependencies
 */
import React from 'react';
import IsolatedBlockEditor, { DocumentSection } from '../src/index';

/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

export default {
	title: 'Isolated Block Editor',
	component: IsolatedBlockEditor,
};

export const Default = () => {
	return (
		<div style={{ height: '800px' }}>
			<IsolatedBlockEditor settings={ {} } />
		</div>
	);
};

export const Controlled = ( { onInput, onChange, onUndo, onRedo, onSelection } ) => {
	const [ blocks, setBlocks ] = useState( [] );

	const handleOnInput = ( newBlocks ) => {
		onInput( newBlocks );
		setBlocks( newBlocks );
	};

	const handleOnChange = ( newBlocks ) => {
		onChange( newBlocks );
		setBlocks( newBlocks );
	};

	const undoManager = useMemo( () => {
		return {
			undo: onUndo,
			redo: onRedo,
			undoStack: [ {} ],
			redoStack: [ {} ],
		};
	}, [ onUndo, onRedo ] );

	return (
		<div style={{ height: '800px' }}>
			<IsolatedBlockEditor
				__experimentalOnSelection={ onSelection }
				__experimentalValue={ blocks }
				__experimentalOnInput={ handleOnInput }
				__experimentalOnChange={ handleOnChange }
				onChangeContent={ newContent => console.log(newContent) }
				__experimentalUndoManager={ undoManager }
				settings={ {} }
			/>
		</div>
	);
};

Controlled.args = {
	inserter: true,
	inspector: true,
	navigation: true,
	toc: true,
	documentInspector: 'Document',
};

Controlled.argTypes = {
	onInput: { action: 'input' },
	onChange: { action: 'change' },
	onUndo: { action: 'undo' },
	onRedo: { action: 'redo' },
	onSelection: { action: 'selection' },
};

export const ToolbarSettings = ( toolbarSettings ) => {
	return (
		<IsolatedBlockEditor settings={ { iso: { toolbar: toolbarSettings } } }>
			<DocumentSection>Arbitrary content can go here.</DocumentSection>
		</IsolatedBlockEditor>
	);
};
ToolbarSettings.args = {
	inserter: true,
	inspector: true,
	navigation: true,
	toc: true,
	documentInspector: 'Document',
};

export const MoreMenu = ( moreMenuSettings ) => {
	return <IsolatedBlockEditor settings={ { iso: { moreMenu: moreMenuSettings, toolbar: { inspector: true } } } } />;
};
MoreMenu.args = {
	editor: true,
	fullscreen: true,
	preview: true,
	topToolbar: true,
};

export const MultipleEditors = ( { count } ) => {
	const arr = Array( count ).fill( null );
	return (
		<>
			{ arr.map( ( _, idx ) => (
				<div style={ { marginBottom: 16 } } key={ idx }>
					<IsolatedBlockEditor settings={ {} } />
				</div>
			) ) }
		</>
	);
};
MultipleEditors.args = { count: 2 };
