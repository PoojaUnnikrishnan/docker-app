import React from "react";

function TreeTraversal({ treeData }) {
    const data = treeData;
    let tree = data.tree;
    let id = tree.id;

    //This function copies the path of leaf nodes to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log("Copied to clipboard:", text);
                alert(`${text} copied to clipboard`);
            })
            .catch((error) => {
                console.error("Failed to copy to clipboard:", error);
            });
    };
    //Traverse through each node of the tree
    const traverseNodes = (nodes, parentPath = '', level = 0) => {
        return nodes.map((node) => {
            const nodePath = `${parentPath}/${node.id}`;
            const isLeafNode = !node.children || node.children.length === 0;
            const renderNode = (
                <div className="flex text-slate-600" key={node.id} style={{ marginLeft: `${level * 20}px` }}>
                    ||---{node.name}
                    <pre>  </pre>
                    {isLeafNode && (
                        <button className="border-black border-2 rounded-md bg-green-200 px-2 text-sm my-1" onClick={() => copyToClipboard(nodePath)}>Copy</button>
                    )}
                </div>
            );

            const renderedChildren = node.children
                ? traverseNodes(node.children, nodePath, level + 1)
                : null;

            return (
                <div key={node.id}>
                    {renderNode}
                    {renderedChildren}
                </div>
            );
        });
    };

    const renderedNodes = traverseNodes([tree]);
    return (
        <div className="flex-col">
            <div className="text-lg font-bold">Tree ID: {id}</div>
            <br />
            <div>
                <div className="px-20">
                    {renderedNodes}
                </div>
            </div>
        </div>
    );
}

export default TreeTraversal;

