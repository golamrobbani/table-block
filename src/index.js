import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import attributes from './attributes';

registerBlockType(metadata.name, {
	attributes,
	edit: Edit,
	save,
});
