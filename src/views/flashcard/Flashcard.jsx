import React, { useState, useEffect, useCallback } from "react";
import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";
import {
  Typography,
  Card,
  IconButton,
  Stack,
  Container,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { motion, AnimatePresence } from "framer-motion";
import ReactCanvasConfetti from "react-canvas-confetti";
import Fireworks from "../../components/effects/Fireworks";
import { fetchFlashcardDaily } from "./api";

const MotionCard = motion(Card);

// Confetti styles
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 999
};

const Lightning = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      opacity: 0,
      zIndex: 1000,
      animation: 'lightning 3s infinite'
    }}
  />
);

const RainDrop = ({ delay, duration }) => (
  <div
    style={{
      position: 'fixed',
      width: '2px',
      height: '100px',
      background: 'linear-gradient(transparent, #fff)',
      animation: `fall ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      opacity: 0.6,
      zIndex: 999,
      filter: 'blur(1px)',
    }}
  />
);

export default function Flashcard() {
  const [selectedButton, setSelectedButton] = useState("all");
  const [showWord, setShowWord] = useState(true);
  const [showMeaning, setShowMeaning] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showRaindrops, setShowRaindrops] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [dailyFlashcards, setDailyFlashcards] = useState([]);

  const refAnimationInstance = React.useRef(null);
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const [showRain, setShowRain] = useState(false);

  // Fetch flashcards based on selected type
  useEffect(() => {
    const getFlashcards = async () => {
      if (selectedButton === 'daily') {
        try {
          const flashcards = await fetchFlashcardDaily();
          setDailyFlashcards(flashcards);
        } catch (error) {
          console.error('Error fetching daily flashcards:', error);
          setDailyFlashcards([]);
        }
      } else {
        // Reset flashcards for unsupported types
        setDailyFlashcards([]);
      }
    };

    getFlashcards();
  }, [selectedButton]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleCheck();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userAnswer]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-50px) rotate(0deg);
          opacity: 0.8;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
      @keyframes lightning {
        0% { opacity: 0; }
        45% { opacity: 0.7; }
        50% { opacity: 0.3; }
        55% { opacity: 0.7; }
        60% { opacity: 0; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setCurrentCardIndex(0);
    resetCard();
  };

  const handleShowWordChange = (event) => {
    setShowWord(event.target.checked);
    setShowMeaning(!event.target.checked);
    resetCard();
  };

  const handleShowMeaningChange = (event) => {
    setShowMeaning(event.target.checked);
    setShowWord(!event.target.checked);
    resetCard();
  };

  const handleNext = () => {
    if (!dailyFlashcards.length) return;
    setDirection(1);
    setCurrentCardIndex((prev) => (prev + 1) % dailyFlashcards.length);
    resetCard();
  };

  const handlePrevious = () => {
    if (!dailyFlashcards.length) return;
    setDirection(-1);
    setCurrentCardIndex((prev) => (prev - 1 + dailyFlashcards.length) % dailyFlashcards.length);
    resetCard();
  };

  const resetCard = () => {
    setUserAnswer("");
    setIsCorrect(null);
    setShowAnswer(false);
    setShowRain(false);
  };

  const playThunder = () => {
    const thunder = new Audio('/thunder.mp3');
    thunder.volume = 0.3;
    thunder.play().catch(e => console.log('Thunder audio failed to play'));
  };

  const handleCheck = () => {
    if (!dailyFlashcards.length) return;
    const currentCard = dailyFlashcards[currentCardIndex];
    const correctAnswer = showWord ? currentCard.meaning : currentCard.word;
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);

    if (isAnswerCorrect) {
      setShowFireworks(true);
      setShowRaindrops(false);
      setShowLightning(false);
      setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
    } else {
      setShowRaindrops(true);
      setShowLightning(true);
      playThunder();
      setTimeout(() => {
        setShowRaindrops(false);
        setShowLightning(false);
      }, 1000);
    }
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      zIndex: 0
    })
  };

  // Render loading or empty state
  if (!dailyFlashcards || dailyFlashcards.length === 0) {
    return (
      <Stack
        sx={{
          background: "url(/bgr.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <AppAppBar name="nvh0610" currentPage="plan" />
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              color: '#2c3e50', 
              my: 4, 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Flashcards
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            {['all', 'personal', 'daily'].map((type) => (
              <Button
                key={type}
                variant={selectedButton === type ? "contained" : "outlined"}
                onClick={() => handleButtonClick(type)}
                sx={{
                  mx: 1,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'capitalize',
                  backgroundColor: selectedButton === type ? '#25ba25' : '#cf87ff',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: selectedButton === type ? '#1e9e1e' : '#ba68ff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {type} Flashcards
              </Button>
            ))}
          </Box>

          <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
            <Typography variant="h5" sx={{ color: '#2c3e50' }}>
              {selectedButton === 'daily' 
                ? "Loading daily flashcards..." 
                : `${selectedButton === 'all' ? 'All' : 'Personal'} Flashcards feature coming soon!`}
            </Typography>
          </Stack>
        </Container>
        <Footer />
      </Stack>
    );
  }

  // Main content render
  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.5s ease"
      }}
    >
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Fireworks isActive={showFireworks} />

      {showRaindrops && Array.from({ length: 100 }).map((_, i) => (
        <RainDrop
          key={i}
          delay={Math.random() * 1}
          duration={Math.random() * 0.4 + 0.3}
        />
      ))}

      {showLightning && <Lightning />}

      <AppAppBar name="nvh0610" currentPage="plan" />

      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            color: '#2c3e50', 
            my: 4, 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Flashcards
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          {['all', 'personal', 'daily'].map((type) => (
            <Button
              key={type}
              variant={selectedButton === type ? "contained" : "outlined"}
              onClick={() => handleButtonClick(type)}
              sx={{
                mx: 1,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'capitalize',
                backgroundColor: selectedButton === type ? '#25ba25' : '#cf87ff',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: selectedButton === type ? '#1e9e1e' : '#ba68ff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}
            >
              {type} Flashcards
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showWord}
                onChange={handleShowWordChange}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  '&.Mui-checked': { color: '#25ba25' },
                }}
              />
            }
            label="Show Word"
            sx={{ mx: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showMeaning}
                onChange={handleShowMeaningChange}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  '&.Mui-checked': { color: '#25ba25' },
                }}
              />
            }
            label="Show Meaning"
            sx={{ mx: 2 }}
          />
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            color: '#7f8c8d',
            mb: 2
          }}
        >
          {`${currentCardIndex + 1} / ${dailyFlashcards.length}`}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '400px' }}>
          <IconButton 
            onClick={handlePrevious} 
            sx={{ 
              mx: 2,
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
              }
            }}
          >
            <NavigateBeforeIcon fontSize="large" sx={{ color: '#3498db' }} />
          </IconButton>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <MotionCard
              key={currentCardIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.15 },
                scale: { duration: 0.15 }
              }}
              sx={{
                width: 500,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                background: '#ffffff',
                padding: 3,
              }}
            >
              <Typography 
                variant="h3" 
                component="div" 
                align="center"
                sx={{ 
                  color: '#2c3e50',
                  mb: 4,
                  fontWeight: 'bold',
                }}
              >
                {showWord ? dailyFlashcards[currentCardIndex].word : dailyFlashcards[currentCardIndex].meaning}
              </Typography>

              <Box sx={{ width: '100%', maxWidth: 300 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={showWord ? "Enter meaning" : "Enter word"}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                  error={isCorrect === false}
                  autoComplete="off"
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCheck}
                  sx={{
                    backgroundColor: isCorrect === null ? '#3498db' : isCorrect ? '#25ba25' : '#e74c3c',
                    '&:hover': {
                      backgroundColor: isCorrect === null ? '#2980b9' : isCorrect ? '#1e9e1e' : '#c0392b',
                    }
                  }}
                >
                  Check
                </Button>

                {showAnswer && (
                  <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ 
                      mt: 2,
                      color: isCorrect ? '#25ba25' : '#e74c3c',
                      fontWeight: 'bold'
                    }}
                  >
                    {isCorrect ? 'Correct!' : 'Incorrect!'}
                  </Typography>
                )}
              </Box>
            </MotionCard>
          </AnimatePresence>

          <IconButton 
            onClick={handleNext} 
            sx={{ 
              mx: 2,
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
              }
            }}
          >
            <NavigateNextIcon fontSize="large" sx={{ color: '#3498db' }} />
          </IconButton>
        </Box>

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            mt: 2, 
            color: '#7f8c8d',
            fontStyle: 'italic'
          }}
        >
          Use arrow keys to navigate and Enter to check your answer
        </Typography>
      </Container>

      <Footer />
    </Stack>
  );
}