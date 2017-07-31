import React, {Component} from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import {Modal, Button} from 'react-bootstrap';

export default class UserListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDeleteModal: false,
            userId: null,
        };
    }

    componentDidMount() {
        this.props.onUserList();
    }

    deleteUser(userId) {
        this.setState({isShowDeleteModal: true, userId: userId})
    }

    cancelButton() {
        this.setState({isShowDeleteModal: false, userId: null})
    }

    editUser(userId){
        this.props.onAddUser(userId);
    }

    confirmButton() {
        superagent
            .delete(API_PREFIX + `/users/${this.state.userId}`)
            .end((err, res) => {
                if (err) {
                    throw (err);
                } else {
                    if (res.status === 204) {
                        this.setState({isShowDeleteModal: false}, () => {
                            this.props.onUserList();
                        })
                    }
                }
            });
    }

    render() {
        const fields = [
            {userInfo: '姓名'},
            {userInfo: '年龄'},
            {userInfo: '操作'}
        ];
        const userList = this.props.userList || [];
        let userHTML = userList.map(({name, age, id}, index) => {
            return (
                <tr key={index}>
                    <td> {name} </td>
                    <td>{age}</td>

                    <td>
                        <div className='action-buttons'>
                            <a className='green'>
                                <i className={'fa fa-pencil bigger'} onClick={this.editUser.bind(this,id)}> </i>
                            </a>
                            <a className='red'>
                                <i className='fa fa-trash-o bigger' onClick={this.deleteUser.bind(this, id)}> </i>
                            </a>
                        </div>
                    </td>
                </tr>
            );
        });
        return (
            <div className='user-form'>
                <div className='table-form'>
                    <table className='table table-striped table-bordered table-hover'>
                        <thead>
                        <tr>
                            {fields.map(({userInfo}, index) => {
                                return (<th key={index}>{userInfo}</th>);
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {userHTML}
                        </tbody>
                    </table>
                </div>
                <div className={this.state.isShowDeleteModal ? '' : 'hidden'}>
                    <div className='static-modal'>

                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>删除提示</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                您确定要删除此试卷吗？
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.cancelButton.bind(this)}>取消</Button>
                                <Button bsStyle='primary' onClick={this.confirmButton.bind(this)}>确定</Button>
                            </Modal.Footer>

                        </Modal.Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

