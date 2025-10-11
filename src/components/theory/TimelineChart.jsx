import React from 'react';
import styles from './TimelineChart.module.css';

const TimelineChart = () => {
  const events = [
    {
      year: '1991',
      title: 'MD5 Created',
      description: 'Ronald Rivest designed MD5 as an improvement over MD4',
      type: 'creation',
      icon: '🔨'
    },
    {
      year: '1995',
      title: 'SHA-1 Published',
      description: 'NSA published SHA-1 as part of the Digital Signature Standard',
      type: 'creation',
      icon: '📋'
    },
    {
      year: '2004',
      title: 'MD5 Collision Found',
      description: 'First practical collision attack demonstrated by Xiaoyun Wang',
      type: 'vulnerability',
      icon: '⚠️'
    },
    {
      year: '2005',
      title: 'SHA-1 Theoretical Attack',
      description: 'Theoretical collision attack discovered, reducing security',
      type: 'vulnerability',
      icon: '🔍'
    },
    {
      year: '2012',
      title: 'SHA-3 Standardized',
      description: 'Keccak algorithm selected as SHA-3 standard',
      type: 'creation',
      icon: '✨'
    },
    {
      year: '2015',
      title: 'Argon2 Winner',
      description: 'Argon2 wins Password Hashing Competition',
      type: 'creation',
      icon: '🏆'
    },
    {
      year: '2017',
      title: 'SHA-1 Collision Attack',
      description: 'Google demonstrates practical SHA-1 collision (SHAttered attack)',
      type: 'vulnerability',
      icon: '💥'
    },
    {
      year: '2020',
      title: 'Industry Moves Away',
      description: 'Major browsers and platforms deprecate MD5 and SHA-1',
      type: 'milestone',
      icon: '🚫'
    }
  ];

  const getEventColor = (type) => {
    const colors = {
      creation: '#48bb78',
      vulnerability: '#f56565',
      milestone: '#667eea'
    };
    return colors[type] || '#cbd5e0';
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hash Algorithm Timeline</h2>
      <p className={styles.subtitle}>
        Key events in the history of cryptographic hash functions
      </p>

      <div className={styles.timeline}>
        {events.map((event, index) => (
          <div 
            key={index}
            className={`${styles.event} ${index % 2 === 0 ? styles.eventLeft : styles.eventRight}`}
          >
            <div className={styles.eventContent}>
              <div 
                className={styles.eventIcon}
                style={{ backgroundColor: getEventColor(event.type) }}
              >
                <span>{event.icon}</span>
              </div>
              
              <div className={styles.eventDetails}>
                <span 
                  className={styles.eventYear}
                  style={{ color: getEventColor(event.type) }}
                >
                  {event.year}
                </span>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
                <span 
                  className={styles.eventType}
                  style={{ backgroundColor: getEventColor(event.type) }}
                >
                  {event.type}
                </span>
              </div>
            </div>

            <div 
              className={styles.eventDot}
              style={{ backgroundColor: getEventColor(event.type) }}
            ></div>
          </div>
        ))}
        
        <div className={styles.timelineLine}></div>
      </div>
    </div>
  );
};

export default TimelineChart;
