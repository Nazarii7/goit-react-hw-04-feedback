import { useState, useEffect } from 'react';
import css from './App.module.css';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalAll, setTotalAll] = useState(0);
  const [positivePer, setPositivePer] = useState(0);

  const options = ['good', 'neutral', 'bad'];

  const onLeaveFeedback = feedback => () => {
    switch (feedback) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setTotalAll(good + neutral + bad);
    setPositivePer(
      good + neutral + bad && Math.round((good / (good + neutral + bad)) * 100)
    );
  }, [good, neutral, bad]);

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {totalAll ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalAll={totalAll}
            positivePer={positivePer}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
