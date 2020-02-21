import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    image:{
        width:277,
        height:350,
        marginLeft:'112px',
        marginTop:-32,
        display:'block',
        background: 'rgba(253, 88, 66, 0.7)',
        borderRadius: '10px'
    }
});


class Image extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;
        return(
            // <div >
            <img className={classes.image} src={'https://thenypost.files.wordpress.com/2020/01/kobe-bryant-10.jpg?quality=80&strip=all&w=1024'} />
        )
    }
}

Image.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Image);
