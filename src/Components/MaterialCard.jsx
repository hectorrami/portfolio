import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image from '../img/IMG_4154.jpeg';

function MaterialCard() {
	return (
		<Card sx={{ maxWidth: 345}}>
		<CardActionArea>
			<CardMedia
				component="img"
				height="300"
				image={image}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Hector Ramirez
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Hi, I'm a software developer from Houston, Texas.I graduated from the 
					University of Houston with a degree in Computer Science and currently work 
					as a UI developer.
				</Typography>
			</CardContent>
		</CardActionArea>
	</Card>
	)
}

export default MaterialCard