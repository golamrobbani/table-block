import { useBlockProps } from '@wordpress/block-editor';
export default function save() {
	return (
		<div {...useBlockProps.save()}>
			<h2>Save</h2>
		</div>
	);
}
