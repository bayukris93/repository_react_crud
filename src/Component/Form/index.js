import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import UploadFoto from '../Upload';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { simpanDataBarang } from '../../Service/service';

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
   
    return (
        <Modal
            visible={visible}
            title="Form Barang"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="title"
                    label="Nama Barang"

                    rules={[
                        {
                            required: true,
                            message: 'Please input !',
                        },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>

                <Form.Item name="harga_beli" label="Harga Beli">
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="harga_jual" label="Harga Jual">
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="stok" label="Stok">
                    <Input type="text" />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}

                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const FormPopUp=({funcSetNew}) =>{
      const [visible, setVisible] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
        var payload = {
            nama: values.title, harga_beli: values.harga_beli, harga_jual: values.harga_jual, stok: values.stok, foto: values.foto
        }
        console.log(payload)
        simpanDataBarang(payload)
        funcSetNew()
    };

    
    
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                >
                Tambah Barang
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default FormPopUp