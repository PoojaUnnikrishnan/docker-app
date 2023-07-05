
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
    const copyToClipboard = (nodePath) => {
        navigator.clipboard.writeText(nodePath)
            .then(() => {
                setCopiedNode(nodePath);
            })
            .catch((error) => {
                console.error('Failed to copy node path to clipboard: ', error);
            });
    };
    return (
        <div className="flex-col">
            <div className="my-10">
                <input
                    type="file"
                    id="file"
                    className="input-file"
                    onChange={handleFileUpload}
                    name="Upload File"
                />
            </div>
            <div>
                {treeData && <TreeTraversal treeData={treeData} />}
            </div>
        </div>



    );
}

export default Tree;

