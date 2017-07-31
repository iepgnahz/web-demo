import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import superagent from 'superagent';

export default class EditorUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            editorUserId: null
        };
    }

    cancelButton() {
        this.props.onCancelModal();
        this.name.value = '';
        this.age.value = '';
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.editorUserId;
        this.cleanValue();
        if (id) {
            this.setState({
                editorUserId: id
            });
            superagent
                .get(API_PREFIX + `/users/${id}`)
                .end((err, res) => {
                    if (err) {
                        throw (err)
                    } else {
                        this.name.value = res.body.name;
                        this.age.value = res.body.age;
                    }
                })
        }
    }

    cleanValue() {
        this.name.value = '';
        this.age.value = '';
    }

    confirmButton() {
        if (this.state.editorUserId) {
            superagent
                .put(API_PREFIX + `/users/${this.state.editorUserId}`)
                .set('Content-Type', 'application/json')
                .send({name: this.name.value, age: this.age.value})
                .end((err, res) => {
                    if (res.statusCode === 204) {
                        this.props.onUserList();
                        this.props.onCancelModal();
                        this.cleanValue();
                    } else {
                        throw err;
                    }
                });

        } else {
            superagent
                .post(API_PREFIX + '/users')
                .set('Content-Type', 'application/json')
                .send({name: this.state.name, age: this.state.age})
                .end((err, res) => {
                    if (res.statusCode === 201) {
                        this.props.onUserList();
                        this.props.onCancelModal();
                        this.cleanValue();
                    } else {
                        throw err;
                    }
                });
        }
    }

    editUserName() {
        this.setState({name: this.name.value});
    }

    editAge() {
        this.setState({age: this.age.value})
    }

    render() {
        return (
            <div className='edit-user paper-info'>
                <div className='static-modal'>

                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>{this.state.editorUserId?'编辑用户':'新增用户'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='row input-position'>
                                <label className='col-sm-2 label-control'> 姓名</label>
                                <div className='col-sm-6'>
                                    <input type='text' className='form-control' placeholder='请输入姓名'
                                           ref={(ref) => {
                                               this.name = ref;
                                           }}
                                           onBlur={this.editUserName.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <label className='col-sm-2  label-control'>年龄</label>
                                <div className='col-sm-6'>
                                    <input type='number' className='form-control' placeholder='请输入年龄'
                                           ref={(ref) => {
                                               this.age = ref;
                                           }}
                                           onBlur={this.editAge.bind(this)}
                                    />
                                </div>
                            </div>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.cancelButton.bind(this)}>取消</Button>
                            <Button bsStyle='primary' onClick={this.confirmButton.bind(this)}>确定</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            </div>
        );
    }
}