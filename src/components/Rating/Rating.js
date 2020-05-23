import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

const IconContainer = (props) => {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
};

const UI_Rating = ({ ratingSelected, defaultValue }) => {
  const onChange = (e) => {
    const rating = e.target.value;
    console.log(rating);
  };
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating
        name="customized-icons"
        defaultValue={defaultValue}
        value={ratingSelected}
        getLabelText={(value) => customIcons[value].label}
        onChange={onChange}
        IconContainerComponent={IconContainer}
      />
    </Box>
  );
};

export default UI_Rating;
