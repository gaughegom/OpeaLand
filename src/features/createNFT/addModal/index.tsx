import React from "react";

import styles from "./addModalStyles.module.scss";

import Dialog from "@mui/material/Dialog";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AddModal({
    open,
    handleClose,
    setOpen,
    properties,
    setProperties,
}: any) {
    const [newProperties, setNewProperties] = React.useState([...properties]);

    const saveClick = () => {
        const _properties = [...newProperties].filter(item=>item.name)
        setProperties(_properties);
        setOpen(false);
    };
    const handleRemoveProperties = (id: string) => {
        let _properties = [...newProperties];
        _properties = _properties.filter((prop) => prop.id !== id);
        setNewProperties(_properties);
    };
    const handleAddProperties = () => {
        let _properties = [...newProperties];
        _properties.push({
            type: "",
            name: "",
            id: Date.now().toString(),
        });
        setNewProperties(_properties);
    };
    const handlePropertiesChange = (
        id: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        //find the index to be changed
        const index = newProperties.findIndex((m) => m.id === id);

        let _properties = [...newProperties] as any;
        _properties[index][event.target.name] = event.target.value;
        setNewProperties(_properties);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className={styles.box}>
                <div className={styles.flex}>
                    <div className={styles.title}>Add properties</div>

                    <div className={styles.table}>
                        {newProperties &&
                            newProperties.map((item) => (
                                <div className={styles.row} key={item.id}>
                                    <div
                                        className={styles.remove}
                                        onClick={() => {
                                            handleRemoveProperties(item.id);
                                        }}
                                    >
                                        <CancelIcon
                                            sx={{
                                                fontSize: 24,
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                    <input
                                        className={styles.type}
                                        placeholder="Type"
                                        value={item.type}
                                        name="type"
                                        onChange={(e) => handlePropertiesChange(item.id, e)}
                                    ></input>
                                    <input
                                        className={styles.name}
                                        placeholder="Name"
                                        value={item.name}
                                        name="name"
                                        onChange={(e) => handlePropertiesChange(item.id, e)}
                                    ></input>
                                </div>
                            ))}
                        <div
                            className={styles.addbtn}
                            onClick={handleAddProperties}
                        >
                            <div className={styles.addIcon}>+</div>
                        </div>
                    </div>

                    <div className={styles.save} onClick={saveClick}>
                        Save
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
