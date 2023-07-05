
import React, { useState } from "react";
import TreeTraversal from "./TreeTraversal";

function Tree() {
    const [treeData, setTreeData] = useState("");
    const [copiedNode, setCopiedNode] = useState('');
    const handleFileUpload = (event) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const data = JSON.parse(fileReader.result);
            setTreeData(data);
            // console.log(data)
        };
        fileReader.readAsText(event.target.files[0]);
    };
    return (
        <div className="flex-col">
            <div className="my-10 items-center">
                <div>
                    Upload a JSON file to get the directory tree
                </div>
                <br />
                <input
                    type="file"
                    id="file"
                    className="input-file"
                    onChange={handleFileUpload}
                    name="Upload File"
                    style={{ backgroundColor: "rgb(187 247 208)", }}
                />

            </div>
            <div>
                {treeData && <TreeTraversal treeData={treeData} />}
            </div>
        </div>



    );
}

export default Tree;

