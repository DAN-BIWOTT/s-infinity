import faker from 'faker';
import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@material-ui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: 'Consult. Lets talk about courses you are most likely to be enrolled in',
    moreInfo:'Text me on whats app, depending on what you got on your KCSE, i\'ll suggest courses you should register for. You can also change the course once admitted and settled in Canada',
    type: 'order1'
  },
  {
    title: 'Fill the form. This will enable me to know how I shall fill the application forms.',
    moreInfo:'I shall read through the form and structure a university application for you.',
    type: 'order2'
  },
  {
    title: 'Submit the form and pay the application fee + half of my fee.(25$)',
    moreInfo:'The application fee is stipulated by the University you choose. I shall send a screenshot of the university application fee policy and the Receipt to your inbox.',
    type: 'order3'
  },
  {
    title: 'Wait for feedback.',
    moreInfo:'Different universities have different times to process the applications. I\'ll send weekly updates until a feedback is given.',
    type: 'order4'
  },
  {
    title: 'Celebrate.',
    moreInfo:'Once your letter of acceptance is sent, you shall pay the fee balance and I\'ll send you your log in credentials plus a check list of how to prepare for your arrival to Canada.',
    type: 'order5'
  }
];

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, moreInfo } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {moreInfo}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppOrderTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="How To Start" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
