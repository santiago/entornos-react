import React, { Fragment, useState, useEffect } from 'react'
import { Button, Modal, Form, Input, Table } from 'antd'
import { connect } from "react-redux"
import { addDevice, fetchDevices } from '../redux/actions'


const ModalContent = props => {
  // console.log("props: ", props);
  const { form, loading, handleLoading, dispatch, showModal } = props;
  const { form: {getFieldDecorator} } = props
  const handleOk = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        handleLoading()
        const { name, description } = values;
        console.log("Received values of form: ", values);
        dispatch(addDevice(name, description));
        setTimeout(() => {
          handleLoading();
          showModal();
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
function DeviceList(props) {
  console.log('props: ', props);
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const { dispatch, devices } = props
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
  useEffect(() => {
    dispatch(fetchDevices())
  }, [devices.length])
  function onShowModal() {
    setShowModal(!showModal)
  }
  function handleCancel() {
    setShowModal(!showModal)
  }
  function handleLoading() {
    setLoading(!loading)
  }
  return (
    <Fragment>
      <Button type="primary" onClick={onShowModal}>Agrega dispositivo</Button>
      <Modal
        visible={showModal}
        title="Nuevo dispositivo"
        onCancel={handleCancel}
        footer={null}
      >
        <WrappedApp
          handleLoading={handleLoading}
          showModal={onShowModal}
          dispatch={dispatch}
        />
      </Modal>
      <Table
        columns={columns}
        expandedRowRender={record => (
          <p style={{ margin: 0 }}>{record.descripcion}</p>
        )}
        dataSource={devices}
      />
    </Fragment>
  )
}

function mapStateToProps(state) {
  return { 
    devices: state.devices.map(e => ({ ...e, key: e._id })) 
  }
}

export default connect(mapStateToProps)(DeviceList)