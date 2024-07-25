import { Node, mergeAttributes } from '@tiptap/core';

const Shortcode = Node.create({
  name: 'shortcode',

  group: 'inline',

  atom: true,

  addAttributes() {
    return {
      code: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-code'),
        renderHTML: (attributes) => {
          return { 'data-code': attributes.code };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-code]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      insertShortcode: (code) => ({ commands }) => {
        return commands.insertContent({ type: this.name, attrs: { code } });
      },
    };
  },
});

export default Shortcode;
