import * as React from 'react';
import { Link } from 'react-router-dom';
//import { QuestionCategory } from './shared/enums/question-category';

import './category-browse.scss';


//import { Question } from './shared/types';
//import { QuestionListElement } from './question-list-element'
//import { DataAccess } from './shared/data-access';

interface BackHeaderProps {
    routeTo: string
  }

interface CategoryBrowseProps{

}

interface CategoryButtonProps{
    category: string;
    icon?: string;
    routeTo: string;
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
    return(
        <div className = 'category-button-container'>
            <div className = 'category-button-icon-container'>
            <Link to={props.routeTo}>
                {props.icon}
            </Link>
            </div>
            <div className = 'category-button-text'>
                {props.category}
            </div>
        </div>
    )
}

export const CategoryBrowse: React.SFC<CategoryBrowseProps> = (props) => {
    return (
        <div className = 'page'>
            <BackHeader routeTo = '/' />
            <div className = 'header-container'>
                <div className = 'header-text'>
                    What do you want to know about?
                </div>
            </div>
            <div className = 'category-list-container'>
                <CategoryButton
                    category = 'Sexual Health'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Sex'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'LGBTQ'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Relationships'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Condoms, Dental Dams, and Protection'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Consent'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Birth Control'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Periods'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Pregnancy'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'STIs'
                    routeTo = '/'/>
                <CategoryButton
                    category = 'Butt Stuff'
                    routeTo = '/'/>
            </div>
        </div>
    )
}