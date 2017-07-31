import React, {Component} from 'react';

export default class UserListTable extends Component {

    handleClick() {
        this.props.onAddUser();
    }

    render() {
        return (
            <div className='paperList-header'>
                <div className='header'>
                    <div className='table-header'>用户列表</div>
                    <div className='row'>
                        <div className='paperList-title col-sm-offset-10 col-sm-2'>

                            <button className='btn btn-default ' onClick={this.handleClick.bind(this)}>
                                <span className='text'>新增用户 </span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}