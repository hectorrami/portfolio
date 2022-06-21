import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MaterialCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.github.com/users/hectorrami')
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  const {
    name, bio, avatar_url, followers, following, location,
  } = data;

  if (loading) return <h1>Loading...</h1>;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={avatar_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {location}
          </Typography>
          <Typography variant="body2" component="div">
            {bio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Follower: ${followers}, Following: ${following}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MaterialCard;
