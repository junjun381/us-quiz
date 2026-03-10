import { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { statesData, fipsToState, allCities } from './data/states'
import './App.css'

type Tab = 'states' | 'cities'
type GameMode = 'explore' | 'quiz-name-to-map' | 'quiz-map-to-name' | 'quiz-fill-in'

const WIDTH = 960
const HEIGHT = 600

function App() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [usData, setUsData] = useState<any>(null)
  const [tab, setTab] = useState<Tab>('states')

  // クイズ共通
  const [gameMode, setGameMode] = useState<GameMode>('explore')
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong', message: string } | null>(null)
  const [choices, setChoices] = useState<string[]>([])

  // 州クイズ
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [currentStateFips, setCurrentStateFips] = useState<number | null>(null)
  const [remainingStates, setRemainingStates] = useState<number[]>([])
  const [hiddenStates, setHiddenStates] = useState<number[]>([])
  const [fillInStateFips, setFillInStateFips] = useState<number | null>(null)

  // 都市クイズ
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [currentCityName, setCurrentCityName] = useState<string | null>(null)
  const [remainingCities, setRemainingCities] = useState<string[]>([])
  const [hiddenCities, setHiddenCities] = useState<string[]>([])
  const [fillInCityName, setFillInCityName] = useState<string | null>(null)

  // ズーム
  const [isZoomed, setIsZoomed] = useState(false)
  const zoomRef = useRef<any>(d3.zoomIdentity)
  const zoomBehaviorRef = useRef<any>(null)
  const prevTabRef = useRef<Tab>('states')

  // ヘルプ
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    fetch('/data/states.json')
      .then(r => r.json())
      .then(setUsData)
  }, [])

  const endQuiz = useCallback(() => {
    setGameMode('explore')
    setCurrentStateFips(null)
    setRemainingStates([])
    setHiddenStates([])
    setFillInStateFips(null)
    setCurrentCityName(null)
    setRemainingCities([])
    setHiddenCities([])
    setFillInCityName(null)
    setFeedback(null)
    setChoices([])
  }, [])

  const resetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return
    zoomRef.current = d3.zoomIdentity
    d3.select(svgRef.current).transition().duration(400).call(zoomBehaviorRef.current.transform, d3.zoomIdentity)
    setIsZoomed(false)
  }

  // --- 州クイズ ---
  const startStateQuiz = (mode: 'quiz-name-to-map' | 'quiz-map-to-name') => {
    const shuffled = [...statesData].sort(() => Math.random() - 0.5).map(s => s.fips)
    setGameMode(mode)
    setScore(0)
    setTotalQuestions(0)
    setRemainingStates(shuffled)
    setCurrentStateFips(null)
    setFeedback(null)
  }

  const startStateFillIn = () => {
    const count = 8
    const hidden = [...statesData].sort(() => Math.random() - 0.5).slice(0, count).map(s => s.fips)
    setGameMode('quiz-fill-in')
    setHiddenStates(hidden)
    setScore(0)
    setTotalQuestions(hidden.length)
    setFillInStateFips(null)
    setFeedback(null)
  }

  useEffect(() => {
    if (tab !== 'states') return
    if ((gameMode === 'quiz-name-to-map' || gameMode === 'quiz-map-to-name') && remainingStates.length > 0 && !currentStateFips) {
      const next = remainingStates[0]
      setCurrentStateFips(next)
      if (gameMode === 'quiz-map-to-name') {
        const others = statesData.filter(s => s.fips !== next)
        const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(s => s.name)
        const correct = fipsToState[next].name
        setChoices([...wrong, correct].sort(() => Math.random() - 0.5))
      }
    }
  }, [tab, gameMode, remainingStates, currentStateFips])

  const handleStateClick = useCallback((fips: number) => {
    if (gameMode === 'quiz-name-to-map' && currentStateFips !== null) {
      setTotalQuestions(prev => prev + 1)
      if (fips === currentStateFips) {
        setScore(prev => prev + 1)
        setFeedback({ type: 'correct', message: '正解！🎉' })
        setTimeout(() => {
          const newRemaining = remainingStates.slice(1)
          setRemainingStates(newRemaining)
          setCurrentStateFips(null)
          setFeedback(null)
          if (newRemaining.length === 0) setTimeout(() => { alert(`クイズ終了！\nスコア: ${score + 1} / ${totalQuestions + 1}`); endQuiz() }, 500)
        }, 900)
      } else {
        const clicked = fipsToState[fips]?.name ?? ''
        setFeedback({ type: 'wrong', message: `はずれ... それは ${clicked}` })
      }
    } else if (gameMode === 'quiz-fill-in' && hiddenStates.includes(fips)) {
      const others = statesData.filter(s => s.fips !== fips)
      const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(s => s.name)
      const correct = fipsToState[fips].name
      setFillInStateFips(fips)
      setChoices([...wrong, correct].sort(() => Math.random() - 0.5))
      setFeedback(null)
    }
  }, [gameMode, currentStateFips, remainingStates, hiddenStates, score, totalQuestions, endQuiz])

  const handleStateChoice = (name: string) => {
    if (gameMode === 'quiz-map-to-name' && currentStateFips !== null) {
      setTotalQuestions(prev => prev + 1)
      const correct = fipsToState[currentStateFips].name
      if (name === correct) {
        setScore(prev => prev + 1)
        setFeedback({ type: 'correct', message: '正解！🎉' })
        setTimeout(() => {
          const newRemaining = remainingStates.slice(1)
          setRemainingStates(newRemaining)
          setCurrentStateFips(null)
          setFeedback(null)
          if (newRemaining.length === 0) setTimeout(() => { alert(`クイズ終了！\nスコア: ${score + 1} / ${totalQuestions + 1}`); endQuiz() }, 500)
        }, 900)
      } else {
        setFeedback({ type: 'wrong', message: `残念... 正解は ${correct}` })
      }
    } else if (gameMode === 'quiz-fill-in' && fillInStateFips !== null) {
      const correct = fipsToState[fillInStateFips].name
      if (name === correct) {
        const newHidden = hiddenStates.filter(f => f !== fillInStateFips)
        setHiddenStates(newHidden)
        setScore(prev => prev + 1)
        setFeedback({ type: 'correct', message: '正解！🎉' })
        setFillInStateFips(null)
        setChoices([])
        setTimeout(() => setFeedback(null), 900)
        if (newHidden.length === 0) setTimeout(() => { alert('全問正解！クリア！🎉'); endQuiz() }, 1000)
      } else {
        setFeedback({ type: 'wrong', message: 'はずれ... もう一度！' })
      }
    }
  }

  // --- 都市クイズ ---
  const startCityQuiz = (mode: 'quiz-name-to-map' | 'quiz-map-to-name') => {
    const shuffled = [...allCities].sort(() => Math.random() - 0.5).map(c => c.name)
    setGameMode(mode)
    setScore(0)
    setTotalQuestions(0)
    setRemainingCities(shuffled)
    setCurrentCityName(null)
    setFeedback(null)
  }

  const startCityFillIn = () => {
    const count = 8
    const hidden = [...allCities].sort(() => Math.random() - 0.5).slice(0, count).map(c => c.name)
    setGameMode('quiz-fill-in')
    setHiddenCities(hidden)
    setScore(0)
    setTotalQuestions(hidden.length)
    setFillInCityName(null)
    setFeedback(null)
  }

  useEffect(() => {
    if (tab !== 'cities') return
    if ((gameMode === 'quiz-name-to-map' || gameMode === 'quiz-map-to-name') && remainingCities.length > 0 && !currentCityName) {
      const next = remainingCities[0]
      setCurrentCityName(next)
      if (gameMode === 'quiz-map-to-name') {
        const others = allCities.filter(c => c.name !== next)
        const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.name)
        setChoices([...wrong, next].sort(() => Math.random() - 0.5))
      }
    }
  }, [tab, gameMode, remainingCities, currentCityName])

  const handleCityDotClick = useCallback((cityName: string) => {
    if (gameMode === 'quiz-name-to-map' && currentCityName !== null) {
      setTotalQuestions(prev => prev + 1)
      if (cityName === currentCityName) {
        setScore(prev => prev + 1)
        setFeedback({ type: 'correct', message: '正解！🎉' })
        setTimeout(() => {
          const newRemaining = remainingCities.slice(1)
          setRemainingCities(newRemaining)
          setCurrentCityName(null)
          setFeedback(null)
          if (newRemaining.length === 0) setTimeout(() => { alert(`クイズ終了！\nスコア: ${score + 1} / ${totalQuestions + 1}`); endQuiz() }, 500)
        }, 900)
      } else {
        setFeedback({ type: 'wrong', message: `はずれ... それは ${cityName}` })
      }
    } else if (gameMode === 'quiz-fill-in' && hiddenCities.includes(cityName)) {
      const others = allCities.filter(c => c.name !== cityName)
      const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.name)
      setFillInCityName(cityName)
      setChoices([...wrong, cityName].sort(() => Math.random() - 0.5))
      setFeedback(null)
    }
  }, [gameMode, currentCityName, remainingCities, hiddenCities, score, totalQuestions, endQuiz])

  const handleCityChoice = (name: string) => {
    if (gameMode === 'quiz-map-to-name' && currentCityName !== null) {
      setTotalQuestions(prev => prev + 1)
      if (name === currentCityName) {
        setScore(prev => prev + 1)
        setFeedback({ type: 'correct', message: '正解！🎉' })
        setTimeout(() => {
          const newRemaining = remainingCities.slice(1)
          setRemainingCities(newRemaining)
          setCurrentCityName(null)
          setFeedback(null)
          if (newRemaining.length === 0) setTimeout(() => { alert(`クイズ終了！\nスコア: ${score + 1} / ${totalQuestions + 1}`); endQuiz() }, 500)
        }, 900)
      } else {
        setFeedback({ type: 'wrong', message: `残念... 正解は ${currentCityName}` })
      }
    } else if (gameMode === 'quiz-fill-in' && fillInCityName !== null) {
      if (name === fillInCityName) {
        const newHidden = hiddenCities.filter(n => n !== fillInCityName)
        setHiddenCities(newHidden)
        setScore(prev => prev + 1)
        setFeedback({ type: 'correct', message: '正解！🎉' })
        setFillInCityName(null)
        setChoices([])
        setTimeout(() => setFeedback(null), 900)
        if (newHidden.length === 0) setTimeout(() => { alert('全問正解！クリア！🎉'); endQuiz() }, 1000)
      } else {
        setFeedback({ type: 'wrong', message: 'はずれ... もう一度！' })
      }
    }
  }

  // --- 地図描画 ---
  useEffect(() => {
    if (!usData || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    if (prevTabRef.current !== tab) {
      zoomRef.current = d3.zoomIdentity
      prevTabRef.current = tab
      setIsZoomed(false)
    }

    const projection = d3.geoAlbersUsa().scale(1070).translate([WIDTH / 2, HEIGHT / 2])
    const path = d3.geoPath().projection(projection)
    const states = topojson.feature(usData, usData.objects.states) as any

    const g = svg.append('g')
    g.attr('transform', zoomRef.current.toString())

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event: any) => {
        zoomRef.current = event.transform
        g.attr('transform', event.transform.toString())
        setIsZoomed(event.transform.k > 1.01 || event.transform.x !== 0 || event.transform.y !== 0)
      })

    zoomBehaviorRef.current = zoom
    svg.call(zoom)
    svg.call(zoom.transform, zoomRef.current)

    // 州ポリゴン
    g.selectAll('path')
      .data(states.features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('fill', (d: any) => {
        const fips = parseInt(d.id)
        if (tab === 'states') {
          if (gameMode === 'quiz-map-to-name' && fips === currentStateFips) return '#ffa500'
          if (gameMode === 'quiz-fill-in' && hiddenStates.includes(fips)) return '#888888'
        }
        return '#69b3a2'
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('cursor', 'pointer')
      .on('mouseover', function (this: SVGPathElement, _e: any, d: any) {
        const fips = parseInt(d.id)
        if (tab === 'states' && gameMode === 'quiz-fill-in' && hiddenStates.includes(fips)) {
          d3.select(this).attr('fill', '#aaaaaa')
        } else {
          d3.select(this).attr('fill', '#ffa500')
        }
        if (tab === 'states' && gameMode === 'explore') {
          setHoveredState(fipsToState[fips]?.name ?? null)
        }
      })
      .on('mouseout', function (this: SVGPathElement, _e: any, d: any) {
        const fips = parseInt(d.id)
        if (tab === 'states' && gameMode === 'quiz-fill-in' && hiddenStates.includes(fips)) {
          d3.select(this).attr('fill', '#888888')
        } else if (tab === 'states' && gameMode === 'quiz-map-to-name' && fips === currentStateFips) {
          d3.select(this).attr('fill', '#ffa500')
        } else {
          d3.select(this).attr('fill', '#69b3a2')
        }
        if (tab === 'states' && gameMode === 'explore') setHoveredState(null)
      })
      .on('click', (_e: any, d: any) => {
        const fips = parseInt(d.id)
        if (tab === 'states') handleStateClick(fips)
      })

    // Alaska / Hawaii インセット枠（ラベルなし・位置はAlbersUsaのclipExtentから算出）
    const insets = [
      { x: 25,  y: 428, w: 226, h: 122 },
      { x: 251, y: 478, w: 106, h: 72  },
    ]
    insets.forEach(({ x, y, w, h }) => {
      g.append('rect')
        .attr('x', x).attr('y', y)
        .attr('width', w).attr('height', h)
        .attr('fill', 'none')
        .attr('stroke', '#aaa')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,3')
        .attr('pointer-events', 'none')
    })

    // 都市ドット（都市タブのみ）
    if (tab === 'cities') {
      allCities.forEach(city => {
        const coords = projection([city.lng, city.lat])
        if (!coords) return

        const isHidden = gameMode === 'quiz-fill-in' && hiddenCities.includes(city.name)
        const isTarget = gameMode === 'quiz-map-to-name' && city.name === currentCityName

        const dotGroup = g.append('g')
          .attr('transform', `translate(${coords[0]}, ${coords[1]})`)
          .attr('cursor', 'pointer')

        dotGroup.append('circle')
          .attr('r', 10)
          .attr('fill', 'transparent')
          .on('click', () => handleCityDotClick(city.name))
          .on('mouseover', () => {
            if (gameMode === 'explore') setHoveredCity(`${city.name} (${city.isCapital ? '★ capital of ' : ''}${city.stateName})`)
          })
          .on('mouseout', () => { if (gameMode === 'explore') setHoveredCity(null) })

        if (city.isCapital) {
          dotGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', '14px')
            .attr('fill', () => {
              if (isTarget) return '#ffa500'
              if (isHidden) return '#888888'
              return '#ffd700'
            })
            .attr('pointer-events', 'none')
            .text('★')
        } else {
          dotGroup.append('circle')
            .attr('r', 5)
            .attr('fill', () => {
              if (isTarget) return '#ffa500'
              if (isHidden) return '#888888'
              return '#ffffff'
            })
            .attr('pointer-events', 'none')
        }
      })
    }

  }, [usData, tab, gameMode, currentStateFips, hiddenStates, currentCityName, hiddenCities, handleStateClick, handleCityDotClick])

  const currentStateName = currentStateFips ? fipsToState[currentStateFips]?.name : null

  return (
    <div className="app">
      <h1>🇺🇸 US Geography Quiz</h1>

      <div className="tabs">
        <button className={tab === 'states' ? 'tab active' : 'tab'} onClick={() => { setTab('states'); endQuiz() }}>
          州を覚える
        </button>
        <button className={tab === 'cities' ? 'tab active' : 'tab'} onClick={() => { setTab('cities'); endQuiz() }}>
          都市を覚える
        </button>
      </div>

      {gameMode === 'explore' ? (
        <>
          <div className="info-display">
            {tab === 'states'
              ? (hoveredState || '州をタップ/ホバーして確認')
              : (hoveredCity || '★ = 州都  ● = 主要都市')}
          </div>
          <div className="quiz-mode-buttons">
            <button className="quiz-start-button" onClick={() => tab === 'states' ? startStateQuiz('quiz-name-to-map') : startCityQuiz('quiz-name-to-map')}>
              🎯 名前→地図
            </button>
            <button className="quiz-start-button secondary" onClick={() => tab === 'states' ? startStateQuiz('quiz-map-to-name') : startCityQuiz('quiz-map-to-name')}>
              🗺️ 地図→名前
            </button>
            <button className="quiz-start-button fill-in" onClick={() => tab === 'states' ? startStateFillIn() : startCityFillIn()}>
              📝 穴埋め
            </button>
          </div>
        </>
      ) : (
        <div className="quiz-panel">
          {gameMode === 'quiz-name-to-map' && (
            <div className="quiz-question">
              <span className="quiz-label">この州・都市をクリック:</span>
              <span className="quiz-target">{tab === 'states' ? currentStateName : currentCityName}</span>
            </div>
          )}

          {gameMode === 'quiz-map-to-name' && (
            <>
              <div className="quiz-question">
                <span className="quiz-label">
                  {tab === 'states' ? 'ハイライトされた州はどこ？' : 'ハイライトされた都市はどこ？'}
                </span>
              </div>
              <div className="quiz-choices">
                {choices.map(c => (
                  <button key={c} className="quiz-choice-button"
                    onClick={() => tab === 'states' ? handleStateChoice(c) : handleCityChoice(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}

          {gameMode === 'quiz-fill-in' && (
            <>
              <div className="quiz-question">
                <span className="quiz-label">
                  {(tab === 'states' ? fillInStateFips : fillInCityName)
                    ? (tab === 'states' ? 'この州はどこ？' : 'この都市はどこ？')
                    : `グレーの${tab === 'states' ? '州' : 'ドット'}をタップ！（残り ${tab === 'states' ? hiddenStates.length : hiddenCities.length} 問）`}
                </span>
              </div>
              {(fillInStateFips !== null || fillInCityName !== null) && (
                <div className="quiz-choices">
                  {choices.map(c => (
                    <button key={c} className="quiz-choice-button"
                      onClick={() => tab === 'states' ? handleStateChoice(c) : handleCityChoice(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="quiz-score">
            {gameMode === 'quiz-fill-in'
              ? `発見: ${score} / ${totalQuestions}`
              : `スコア: ${score} / ${totalQuestions} | 残り: ${tab === 'states' ? remainingStates.length : remainingCities.length}問`}
          </div>

          {feedback && (
            <div className={`quiz-feedback ${feedback.type}`}>{feedback.message}</div>
          )}

          <button className="quiz-end-button" onClick={endQuiz}>クイズを終了</button>
        </div>
      )}

      <div className="help-section">
        <button className="help-toggle" onClick={() => setShowHelp(v => !v)}>
          使い方 {showHelp ? '▲' : '▼'}
        </button>
        {showHelp && (
          <div className="help-content">
            <div className="help-group">
              <span className="help-icon">🗺️</span>
              <div>
                <strong>地図操作</strong>
                <ul>
                  <li>ズーム: ピンチ（スマホ）/ スクロール（PC）</li>
                  <li>移動: スワイプ / ドラッグ</li>
                </ul>
              </div>
            </div>
            <div className="help-group">
              <span className="help-icon">🎯</span>
              <div>
                <strong>クイズ</strong>
                <ul>
                  <li>名前→地図: 正しい州・都市をタップ</li>
                  <li>地図→名前: 4択で答える</li>
                  <li>穴埋め: グレーをタップして答える</li>
                </ul>
              </div>
            </div>
            <div className="help-group">
              <span className="help-icon">🏙️</span>
              <div>
                <strong>都市の記号</strong>
                <ul>
                  <li>★ 黄色 = 州都</li>
                  <li><span style={{ color: '#fff' }}>●</span> 白 = 主要都市</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="map-container">
        {isZoomed && (
          <button className="zoom-reset-button" onClick={resetZoom}>↺ Reset zoom</button>
        )}
        <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: '100%', height: 'auto' }}></svg>
      </div>

      <p className="note">
        Map data: US Census Bureau via topojson/us-atlas
      </p>

      <footer className="app-footer">
        <p>役に立ったら応援していただけると嬉しいです！</p>
        <a href="https://ofuse.me/7a2e33c9" target="_blank" rel="noopener noreferrer" className="ofuse-button">
          ☕ OFUSEで応援する
        </a>
      </footer>
    </div>
  )
}

export default App
