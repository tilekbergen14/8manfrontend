import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "../styles/Editor.module.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      images: [],
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  imageUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e);
      const { data } = await axios.post(
        "http://localhost:5000/image",
        formData
      );
      this.setState({
        images: [
          ...this.state.images,
          `http://localhost:5000/${data.imageUrl}`,
        ],
      });
      return { data: { link: `http://localhost:5000/${data.imageUrl}` } };
    } catch (err) {
      console.log(err);
    }
  };

  clickHandler = () => {
    const currentContentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );

    const images = [];

    let i = 0;
    while (currentContentState.entityMap[i]) {
      if (currentContentState.entityMap[i].type === "IMAGE") {
        images.push(currentContentState.entityMap[i].data.src);
      }
      i++;
    }

    let j = 0;
    while (this.state.images[j]) {
      if (!images.includes(this.state.images[j])) {
        axios.delete(this.state.images[j]).then((result) => {});
      }
      j++;
    }
    this.setState({ images: images });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              defaultSize: {
                width: "100%",
              },
              uploadCallback: this.imageUpload,
            },
          }}
        />
      </div>
    );
  }
}
