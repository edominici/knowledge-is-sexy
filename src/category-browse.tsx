import * as React from 'react';
import { Link } from 'react-router-dom';
import { QuestionCategory } from './shared/enums/question-category';

import './category-browse.scss';
//import { Question } from './shared/types';
//import { QuestionListElement } from './question-list-element'
//import { DataAccess } from './shared/data-access';

interface BackHeaderProps {
    routeTo: string
  }

interface CategoryBrowseProps{

}
interface CategoryBrowseState{
    width: number;
}

interface CategoryButtonProps{
    category: string;
    icon?: string;
    routeTo: string;
    //questionsInCategory: Question[];
}

interface CategoryListProps{
    //width: number;
}

const BackHeader: React.SFC<BackHeaderProps> = (props) => {
    return (
        <div className='back-bar-container'>
        <button className='back-button'>
            <Link to={props.routeTo}> 
            Back
            </Link>
        </button>
        </div>
    )
}

const CategoryButton: React.SFC<CategoryButtonProps> = (props) => {
    const encodedCategoryStr = encodeURIComponent(props.category);
    return(
        <div className = 'category-button-container'>
            <div className = 'category-button-icon-container'>
            <Link to={{
                pathname: props.routeTo,
                search: `?c=${encodedCategoryStr}`
                }}>
                {props.icon}
            </Link>
            </div>
            <div className = 'category-button-text'>
                {QuestionCategory[props.category].toLowerCase().replace(/^(.)|\s(.)/g, ($1:any) => $1.toUpperCase())}
            </div>
        </div>
    )
}
//TODO make the margins of the buttons evenly spaced instead of just centering the whole list
//TODO make the button shape better
//TODO make routeTo links to category search pages
const CategoryListContainer: React.SFC<CategoryListProps> = (props) => {
    /*var newWidth = props.width - (props.width%100);
    var margin = (props.width - newWidth)/2;
    var listStyle = {
        marginLeft: margin,
        marginRight: margin,
        width: newWidth,
    }*/

    return(
        <div className = 'category-list-container'
            //style = {listStyle}
            >
            {Object.keys(QuestionCategory).map(key => //QuestionCategory[key]).map((c:string) => 
            {
                return(
                    <CategoryButton category = {key}
                                    routeTo = '/search'
                                    key = {key}
                                    />
                )

            })}
        </div>
    )
}

export class CategoryBrowse extends React.Component<CategoryBrowseProps, CategoryBrowseState> {
        
    constructor(props: CategoryBrowseProps) {
        super(props);
        /*this.state={
            width: window.innerWidth,
        }*/
    }
    
    /*resizeCategoryListContainer(){
        this.setState({width: window.innerWidth});
    }*/

    /*
    * Add event listener
    */
   /* componentDidMount() {
        this.resizeCategoryListContainer();
        window.addEventListener("resize", this.resizeCategoryListContainer.bind(this));
      }
    
     
      componentWillUnmount() {
        window.removeEventListener("resize", this.resizeCategoryListContainer.bind(this));
      }
    */

    render(){
        return (
        <div className = 'page'>
            <BackHeader routeTo = '/' />
            <div className = 'header-container'>
                <div className = 'header-text'>
                    What do you want to know about?
                </div>
            </div>
            <CategoryListContainer /*width={this.state.width}*//>
        </div>
        )
    }
}