import React, { Fragment, useState, useEffect } from 'react'
import {  Button, Modal, Form, Input, Table } from 'antd'
import { connect } from "react-redux"
import { addEnvironm, fetchEnvironms } from '../redux/actions'

const ModalContent = props => {
  // console.log("props: ", props);
  const { form, loading, handleLoading, dispatch, showModal } = props
  const { form: { getFieldDecorator, resetFields } } = props

  const handleOk = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        handleLoading();
        const { name, description } = values;
        dispatch(addEnvironm(name, description));
        setTimeout(() => {
          handleLoading();
          showModal();
          resetFields();
        }, 3000);
      }
    });
  };
  return (
    <Form onSubmit={handleOk}>
      <Form.Item label="Name">
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Please input your name!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator("description", {
          rules: [{ required: true, message: "Please input the description!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const WrappedApp = Form.create({ name: "modal_content" })(ModalContent);


function EntornoList(props) {
  const { dispatch, entornos } = props
  const columns = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <div>Delete</div>
    }
  ];
  console.log('props: ', props);
  const [ showModal, setShowModal ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    dispatch(fetchEnvironms())
  }, [entornos.length])
  function onShowModal() {
    setShowModal(!showModal)
  };
  function handleCancel() {
    setShowModal(!showModal)
  };
  function handleLoading() {
    setLoading(!loading)
  }
  return (
    <Fragment>
      <Button type="primary" onClick={onShowModal}>Agrega entorno</Button>
      <Modal
        visible={showModal}
        title="Nuevo entorno"
        onCancel={handleCancel}
        footer={null}
      >
        <WrappedApp 
          dispatch={dispatch}
          showModal={onShowModal}
          loading={loading}
          handleLoading={handleLoading}
        />
      </Modal>
      { 
        entornos.length !== 0 ? 
          <Table
            rowKey="_id"
            columns={columns}
            expandedRowRender={record => (
              <p style={{ margin: 0 }}>{record.descripcion}</p>
            )}
            dataSource={entornos}
          /> : <div style={{ textAlign: "center" }}><p style={{ fontSize: "3rem", color: "#255d94" }}>Loading...</p></div>
      }
    </Fragment>
  )
}

function mapStateToProps(state) {
  return { 
    entornos: state.entornos.map(e => ({ ...e, key: e._id })) 
  }
}

export default connect(mapStateToProps)(EntornoList)