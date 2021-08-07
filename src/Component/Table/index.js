import { Table, Tag, Space, Button, Image , message, Input} from 'antd';
import { Popconfirm } from 'antd';
import { useState,useEffect } from 'react';
import { getDataBarang, deleteDataBarang,getDataBarangbyNama } from '../../Service/service';
import Edit from '../../Component/Edit'
import Modal from 'antd/lib/modal/Modal';
import FormPopUp from '../Form';




const TableSample=()=>{
const [data, setData] = useState([])
const [clickNew, setClickNew] = useState(false)
const [clickDelete, setClickDelete] = useState(false)
const [clickEdit, setClickEdit] = useState(false)

const fSetSearch = (param_nama) => {
  getDataBarangbyNama(param_nama)
            .then(response => {
                console.log(response)
                if (response.data != null) {
                }
            })
            .catch(e => {
                console.log(e);
            });

}
const setCreate = () => {
  setClickNew(true)
}

const setEdit = () => {
  setClickEdit(true)
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}
const getBarang = () => {
  getDataBarang()
      .then(response => {
        console.log(response)
          if (response.data != null) {
              setData(response.data);
          }
      })
      .catch(e => {
          setData([])
          console.log(e);
      });
};

const columns = [
  {
    title: 'Foto',
    // dataIndex: 'foto',
    // key: 'foto',
    render: varGambar => {  
    <Image
      width={50}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
      },
  },
  {
    title: 'Name',
    dataIndex: 'nama',
    key: 'nama',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Harga Beli',
    dataIndex: 'harga_beli',
    key: 'harga_beli',
  },
  {
    title: 'Harga Jual',
    dataIndex: 'harga_jual',
    key: 'harga_jual',
  },
 
  {
    title: 'Stok',
    dataIndex: 'stok',
    key: 'stok',
  },
  
  {
    title: 'Action',
    dataIndex:'nama',
    key: 'action',
    render: (text) => (
      <Space size="middle">
      
     <Edit funcSetEdit={setEdit} param_nama={text} />
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => {
                            deleteDataBarang(text)
                            message.success(`data ${text} delete`)
                            setClickDelete(true)
                        }}
    onCancel={cancel}>
  <Button type="danger" style={{borderRadius:5}}>Delete</Button>
  </Popconfirm>     
   </Space>
    ),
  },
];

const dataSource = [
  {
    nama: "sabun",
    harga_jual: "1200",
    harga_beli: "1000",
    stok: "2",
    foto: "",
  },
  {
    nama: "sampo",
    harga_jual: "1300",
    harga_beli: "1100",
    stok: "2",
    foto: "",
  },
  {
    nama: "kopi",
    harga_jual: "110",
    harga_beli: "1000",
    stok: "2",
    foto: "",
  },
  {
    nama: "teh",
    harga_jual: "500",
    harga_beli: "200",
    stok: "2",
    foto: "",
  },
  {
    nama: "gula",
    harga_jual: "1600",
    harga_beli: "1400",
    stok: "2",
    foto: "",
  }
];

useEffect(() => {
  setClickNew(false)
  console.log(clickNew)
  setClickEdit(false)
  console.log(clickNew)

  setClickDelete(false)
  getBarang()
  console.log(getBarang)
}, [clickNew, clickDelete, clickEdit])
return(
  
  <div>
    <div style={{ float: 'right', margin: '16px 0' }}>
    <Input placeholder="Search" onPressEnter={fSetSearch}></Input>
  </div>
    <FormPopUp   funcSetNew={setCreate} />
    <Table columns={columns} dataSource={data} />
  </div>

)
}
export default TableSample