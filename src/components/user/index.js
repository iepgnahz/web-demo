import React, {Component} from 'react';
import superagent from 'superagent';
import TableHeader from './UserListTableHeader';
import TableBody from './UserListTableBody';
import EditorUser from './EditorUser';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowSaveModal: false,
            userList: [],
            editorUserId: null
        };
    }

    getUserList() {
        superagent
            .get(API_PREFIX + '/users')
            .end((err, res) => {
                if (err) {
                    throw (err);
                } else {
                    this.setState({userList: res.body})
                }
            });
    }

    saveUser(userId) {
        this.setState({isShowSaveModal: true,editorUserId:null});
        if (userId) {
            this.setState({editorUserId: userId})
        }
    }

    cancelModal() {
        this.setState({isShowSaveModal: false})
    }

    render() {
        return (
            <div id='user-list' className="col-sm-offset-2 col-sm-8">
                <div>
                    <TableHeader onAddUser={this.saveUser.bind(this)}/>

                    <TableBody onAddUser={this.saveUser.bind(this)} onUserList={this.getUserList.bind(this)}
                               userList={this.state.userList}/>

                </div>
                <div className={this.state.isShowSaveModal ? '' : 'hidden'}>

                    <EditorUser editorUserId={this.state.editorUserId} onCancelModal={this.cancelModal.bind(this)}
                                onUserList={this.getUserList.bind(this)}/>

                </div>
            </div>
        );
    }
}