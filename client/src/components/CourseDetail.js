import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

/** 
 * CourseDetail component - retrieves detail for course from REST API and renders course
 * Specific course is identified by /api/courses/:id route
 * Also renders buttons for "Delete Course" and "Update Course", if user is authenticated
 */
export default class CourseDetail extends Component {
    state = {
        course: {},
        user: {}
    };

    componentDidMount(){
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                course: response.data,
                user: response.data.User
            })
            
        })
        .catch(errors => {
            console.log('Course ID not found', errors);
            this.props.history.push('/notfound');
        })
    }

   
    render() {
        const {course, user} = this.state;

        console.log(user);
        const context  = this.props.context;
        const authUser = context.authenticatedUser;
        return(
            <React.Fragment>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            
                            authUser
                        ?
                            ((authUser.userId === user.id) ? (
                        <React.Fragment>
                            <Link className="button" to={`/courses/${course.id}/update`}> Update Course </Link>
                            <Link className="button" to="/" onClick={() => this.deleteCourse()}> Delete Course </Link>
                            <Link className="button button-secondary" to="/"> Return to List </Link>
                        </React.Fragment>
                        )
                        
                        :
                        <React.Fragment>
                            <Link className="button" to="/"> Return to List </Link>
                        </React.Fragment> ) : <React.Fragment>
                            <Link className="button" to="/"> Return to List </Link>
                        </React.Fragment> 
                        }
                    </div>
                </div>
                <div className="wrap">
                    <h2> Course Detail </h2>
                    <form>
                    <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title" >Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p> By {user.firstName} {user.lastName} </p>
                        <ReactMarkdown children={course.description}/>
                        </div>
                        <div>
                        <h3 className="course--detail--title"> Estimated Time </h3>
                        {
                            (course.estimatedTime === null || course.estimatedTime === '')
                        ?
                        <p> N/A </p>
                        :
                        <p> {course.estimatedTime} </p>
                        }
                        <h3 className="course--detail--title"> Materials Needed </h3>
                        {
                            (course.materialsNeeded === null || course.materialsNeeded === '')
                        ?
                        <p> N/A </p>
                        :
                        <ReactMarkdown children={course.materialsNeeded}/>
                        }
                    </div>
                    </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
 
    deleteCourse = () => {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const id = this.props.match.params.id;
        context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
        .then(errors => {
            if(errors.length){
                this.setState({errors})
            } else {
                //console.log('Course successfully deleted.');
                this.props.history.push('/');
            }
        })
        .catch(error => {
            console.log(error);
            this.props.history.push('/error'); 
        })
    }


    }
