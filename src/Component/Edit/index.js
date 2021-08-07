import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import UploadFoto from '../Upload';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { getDataBarangbyNama, updateDataBarang } from '../../Service/service';

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

const CollectionCreateForm = ({ param_nama, visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const getBarangbyNama = () => {
        getDataBarangbyNama(param_nama)
            .then(response => {
                console.log(response)
                if (response.data != null) {
                    form.setFieldsValue({
                        nama_barang: response.data[0].nama,
                        harga_jual: response.data[0].harga_jual,
                        harga_beli: response.data[0].harga_beli,
                        stok: response.data[0].stok,
                        foto: response.data[0].foto
                    })
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getBarangbyNama()
    }, [])
    
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
                    name="nama_barang"
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

function FormPopUp({ param_nama,funcSetEdit }) {
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
        var payload = {
            nama: values.nama_barang, harga_beli: values.harga_beli, harga_jual: values.harga_jual, stok: values.stok, foto: values.foto
        }
        updateDataBarang(param_nama, payload)
        funcSetEdit()
    };
    return (
        <div>
            <Button
                type="primary"
                onClick={(i) => {
                    setVisible(true);
                }}
            >
                Edit
            </Button>
            <CollectionCreateForm
                param_nama={param_nama}
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