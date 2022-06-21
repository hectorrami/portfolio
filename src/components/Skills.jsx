import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Skills({ skill, image }) {
  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image}
          className="App-logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {skill}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Skills.propTypes = {
  skill: PropTypes.string,
  image: PropTypes.node,
};

Skills.defaultProps = {
  skill: 'none',
  image: '',
};

export default Skills;
