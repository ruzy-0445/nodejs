import React from "react";
import ReactQuill from 'react-quill';
import "../../node_modules/react-quill/dist/quill.snow.css";

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    };

    onChange = (value) => {
        this.setState({ text: value });
        this.props.getDescription(value);
    };

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image']
        ],
    };

    formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    render() {
        return (
            <div className="text-editor">
                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.text}
                    onChange={this.onChange}
                />
            </div>
        );
    };
};

export default TextEditor;