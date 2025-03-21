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
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { motion, AnimatePresence } from "framer-motion";
import ReactCanvasConfetti from "react-canvas-confetti";
import Fireworks from "../../components/effects/Fireworks";
import { fetchFlashcardDaily, confirmFlashcard, fetchVocabularies } from "./api";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PaginationButtons from "../pagination/pagination";


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
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 0,
      zIndex: 1000,
      animation: 'lightning 1s infinite'
    }}
  />
);

const RainDrop = ({ delay, duration }) => (
  <div
    style={{
      position: 'fixed',
      width: '3px',
      height: '120px',
      background: 'linear-gradient(transparent, #666)',
      animation: `fall ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      opacity: 0.8,
      zIndex: 999,
      filter: 'blur(2px)',
    }}
  />
);

export default function Flashcard() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
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
  const [displayType, setDisplayType] = useState('word'); // 'word', 'meaning', 'ipa', 'audio'

  const refAnimationInstance = React.useRef(null);
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const [showRain, setShowRain] = useState(false);

  // Thêm states mới
  const [vocabularies, setVocabularies] = useState([]); // Lưu data từ fetchVocabularies
  const [pagination, setPagination] = useState({}); // Lưu thông tin phân trang

  // Fetch flashcards based on selected type
  useEffect(() => {
    const getFlashcards = async () => {
      try {
        switch (selectedButton) {
          case 'daily':
            const dailyCards = await fetchFlashcardDaily();
            setDailyFlashcards(dailyCards);
            setVocabularies([]); // Reset vocabularies khi chuyển sang daily
            break;

          case 'all':
            const allResult = await fetchVocabularies({
              page,
              limit,
              option: 'all'  // Truyền option 'all' cho All Flashcards
            });
            setVocabularies(allResult.vocabularies || []);
            setPagination(allResult.pagination || {});
            setDailyFlashcards([]); 
            break;

          case 'personal':
            const personalResult = await fetchVocabularies({
              page,
              limit,
              option: 'private'  // Truyền option 'private' cho Personal Flashcards
            });
            setVocabularies(personalResult.vocabularies || []);
            setPagination(personalResult.pagination || {});
            setDailyFlashcards([]);
            break;
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setDailyFlashcards([]);
        setVocabularies([]);
      }
    };

    getFlashcards();
  }, [selectedButton, page, limit]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault();
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
          transform: translateY(-100px) rotate(15deg);
          opacity: 0.8;
        }
        100% {
          transform: translateY(100vh) rotate(25deg);
          opacity: 0.3;
        }
      }
      @keyframes lightning {
        0% { opacity: 0; }
        20% { opacity: 0.8; }
        30% { opacity: 0.3; }
        40% { opacity: 0.8; }
        50% { opacity: 0; }
        60% { opacity: 0.6; }
        70% { opacity: 0; }
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
    // Kiểm tra có flashcards hay không dựa vào selectedButton
    if ((selectedButton === 'daily' && !dailyFlashcards.length) || 
        (selectedButton !== 'daily' && !vocabularies.length)) return;
    
    const maxCards = selectedButton === 'daily' ? dailyFlashcards.length : vocabularies.length;
    
    if (currentCardIndex === maxCards - 1) {
      // Nếu đang ở card cuối và không phải daily, chuyển trang tiếp
      if (selectedButton !== 'daily' && page < pagination.totalPages) {
        setPage(page + 1);
        setCurrentCardIndex(0);
      } else {
        setCurrentCardIndex(0); // Quay lại card đầu
      }
    } else {
      setDirection(1);
      setCurrentCardIndex(prev => prev + 1);
    }
    resetCard();
  };

  const handlePrevious = () => {
    // Kiểm tra có flashcards hay không dựa vào selectedButton
    if ((selectedButton === 'daily' && !dailyFlashcards.length) || 
        (selectedButton !== 'daily' && !vocabularies.length)) return;
    
    const maxCards = selectedButton === 'daily' ? dailyFlashcards.length : vocabularies.length;
    
    if (currentCardIndex === 0) {
      // Nếu đang ở card đầu và không phải daily, quay lại trang trước
      if (selectedButton !== 'daily' && page > 1) {
        setPage(page - 1);
        setCurrentCardIndex(limit - 1);
      } else {
        setCurrentCardIndex(maxCards - 1);
      }
    } else {
      setDirection(-1);
      setCurrentCardIndex(prev => prev - 1);
    }
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

  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    const currentCard = selectedButton === 'daily' 
      ? dailyFlashcards[currentCardIndex]
      : vocabularies[currentCardIndex];

    if (!currentCard || isChecking) return;
    setIsChecking(true);

    let correctAnswer;
    switch (displayType) {
      case 'word':
        correctAnswer = currentCard.meaning;
        break;
      case 'meaning':
      case 'ipa':
      case 'audio':
        correctAnswer = currentCard.word;
        break;
      default:
        correctAnswer = '';
    }

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);

    // Chỉ gọi API confirm khi là daily flashcard
    if (selectedButton === 'daily') {
      try {
        await confirmFlashcard(
          currentCard.vocabulary_id,
          userAnswer.trim(),
          displayType
        );
      } catch (error) {
        console.error("Error confirming flashcard:", error);
      }
    }

    setIsChecking(false);

    // Hiệu ứng vẫn giữ nguyên cho tất cả các loại
    if (isAnswerCorrect) {
      setShowFireworks(true);
      setShowRaindrops(false);
      setShowLightning(false);
      setTimeout(() => {
        setShowFireworks(false);
      }, 1500);
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

  // Update the display options component
  const DisplayOptions = () => (
    <FormControl component="fieldset">
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControlLabel 
          value="word" 
          control={
            <Checkbox 
              checked={displayType === 'word'}
              onChange={() => setDisplayType('word')}
              sx={{
                color: '#25ba25',
                '&.Mui-checked': {
                  color: '#25ba25',
                },
              }}
            />
          } 
          label="Show Word" 
        />
        <FormControlLabel 
          value="meaning" 
          control={
            <Checkbox 
              checked={displayType === 'meaning'}
              onChange={() => setDisplayType('meaning')}
              sx={{
                color: '#25ba25',
                '&.Mui-checked': {
                  color: '#25ba25',
                },
              }}
            />
          } 
          label="Show Meaning" 
        />
        <FormControlLabel 
          value="ipa" 
          control={
            <Checkbox 
              checked={displayType === 'ipa'}
              onChange={() => setDisplayType('ipa')}
              sx={{
                color: '#25ba25',
                '&.Mui-checked': {
                  color: '#25ba25',
                },
              }}
            />
          } 
          label="Show IPA" 
        />
        <FormControlLabel 
          value="audio" 
          control={
            <Checkbox 
              checked={displayType === 'audio'}
              onChange={() => {
                setDisplayType('audio');
                setUserAnswer('');
                setShowAnswer(false);
              }}
              sx={{
                color: '#25ba25',
                '&.Mui-checked': {
                  color: '#25ba25',
                },
              }}
            />
          } 
          label="Show Audio" 
        />
      </Box>
    </FormControl>
  );

  // Update the card display component
  const CardDisplay = ({ card }) => {
    if (!card) return null;

    switch (displayType) {
      case 'word':
        return <Typography>{card.word}</Typography>;
      case 'meaning':
        return <Typography>{card.meaning}</Typography>;
      case 'ipa':
        return <Typography variant="subtitle1" sx={{ color: 'red' }}>{card.ipa}</Typography>;
      case 'audio':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
              onClick={() => speakWord(card.word)}
              sx={{ fontSize: '3rem' }}
            >
              <VolumeUpIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>
          </Box>
        );
      default:
        return null;
    }
  };

  // Add the speak function
  const speakWord = (word) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(word, "UK English Male", {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  // Sửa lại điều kiện kiểm tra data
  const currentFlashcards = selectedButton === 'daily' ? dailyFlashcards : vocabularies;

  // Thêm hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrentCardIndex(0); // Reset về card đầu tiên khi đổi trang
    resetCard();
  };

  // Thêm hàm xử lý thay đổi limit nếu cần
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset về trang 1 khi đổi limit
    setCurrentCardIndex(0);
    resetCard();
  };

  // Sửa lại điều kiện loading state
  if ((!dailyFlashcards.length && selectedButton === 'daily') || 
      (!vocabularies.length && selectedButton !== 'daily')) {
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
                : "Loading " + selectedButton + " flashcards..."}
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
          <DisplayOptions />
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            color: '#7f8c8d',
            mb: 2
          }}
        >
          {`${currentCardIndex + 1} / ${currentFlashcards.length}`}
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
              <CardDisplay card={currentFlashcards[currentCardIndex]} />

              <Box sx={{ width: '100%', maxWidth: 300 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={displayType === 'word' ? "Enter meaning" : displayType === 'meaning' ? "Enter word" : displayType === 'ipa' ? "Enter IPA" : "Enter audio"}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
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

        {/* Thêm pagination buttons cho All và Personal Flashcards */}
        {selectedButton !== 'daily' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <PaginationButtons
              pagination={{ ...pagination, page }}
              onPageChange={handleChangePage}
            />
          </Box>
        )}
      </Container>

      <Footer />
    </Stack>
  );
}