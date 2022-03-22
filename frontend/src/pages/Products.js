import { Container, InputLabel, Optimization } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'
// components
import ReactApexChart from 'react-apexcharts'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Page from '../components/Page'




// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const steps = ['Mathematical Formulation', 'Known parameter values', 'Optimization', 'Checking the solution'];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [cost, setCost] =useState(0) ;
  const [pos, setPos] =useState(0) ;
  const [series, setSeries] = useState(null);
  const [options, setOptions] = useState(null);
  
  
  
  const isStepOptional = (step) => step === 5;
  const isStepSkipped = (step) => skipped.has(step);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/circuit')
      .then((res)=>{
        const a=res.data.x
        const b=res.data.y
        const aa = a.split(',').map(Number);
        const bb = b.split(',').map(Number);
        for (let index = 0; index < aa.length; index+=1) {
          if(! Number.isNaN( aa[index])){
            aa[index]*=100
          }else{
            aa.splice(index, 1)
            bb.splice(index, 1)
          }
        }
        console.log("aa", aa, "bb", bb.reverse());
        setCost(res.data.cost)
        setPos(res.data.pos)
          
        setSeries([{
          name: "Cost",
          data: bb.reverse()
      }])
      setOptions(
        {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Cost History without inertia decay',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: aa,
          decimalsInFloat: 2,
          floating: true,
        },
        yaxis:{
          decimalsInFloat: 2
        }
      },
    )
      })
      .catch((err)=>{
          console.log(err)
      });
  }, []);
  
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        EXAMPLES
        </Typography>
        <InputLabel>Solving an electric circuit using Particle Swarm Optimization</InputLabel>
        PSO can be utilized in a wide variety of fields. 
        In this example, the problem consists of analysing a given electric circuit and finding the electric current that flows through it. 
        The circuit is composed by a source, a resistor and a diode, as shown below.
        <img width="50%" alt="function" src="/static/circuit.png"   style={{ marginLeft: '10.8rem', marginBottom: '5.8rem' }} />

          <Box sx={{ width: '100%' }} justifyContent="space-between" mb={5}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              
              <>
              {activeStep===0&&(
                
                <Typography sx={{ mt: 2, mb: 1 }}>
                <div className="section" id="Mathematical-Formulation">
   <p>
    Kirchhoff’s voltage law states that the directed sum of the voltages around
    any closed loop is zero. In other words, the sum of the voltages of the
    passive elements must be equal to the sum of the voltages of the active
    elements, as expressed by the following equation:
  </p>
  <p>
    $U = v_D + v_R $, where{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-1-Frame"
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>U</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-1"
            style={{ width: "0.964em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.804em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.8em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-2">
                  <span
                    className="mi"
                    id="MathJax-Span-3"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    U
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.11em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>U</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    represents the voltage of the source and,{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-2-Frame"
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>D</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-4"
            style={{ width: "1.338em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.124em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1001.12em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-5">
                  <span className="msubsup" id="MathJax-Span-6">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-7"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-8"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          D
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.816em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>D</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>{" "}
    and{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-3-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>R</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-9"
            style={{ width: "1.338em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.124em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1001.12em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-10">
                  <span className="msubsup" id="MathJax-Span-11">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-12"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-13"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          R
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.816em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>R</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>{" "}
    represent the voltage of the diode and the resistor, respectively.
  </p>
  <p>
    To determine the current flowing through the circuit,{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-4-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>D</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-14"
            style={{ width: "1.338em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.124em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1001.12em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-15">
                  <span className="msubsup" id="MathJax-Span-16">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-17"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-18"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          D
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.816em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>D</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>{" "}
    and{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-5-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>R</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-19"
            style={{ width: "1.338em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.124em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1001.12em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-20">
                  <span className="msubsup" id="MathJax-Span-21">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-22"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-23"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          R
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.816em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>R</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>{" "}
    need to be defined as functions of{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-6-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-24"
            style={{ width: "0.59em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.483em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-25">
                  <span
                    className="mi"
                    id="MathJax-Span-26"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>
    . A simplified Shockley equation will be used to formulate the
    current-voltage characteristic function of the diode. This function relates
    the current that flows through the diode with the voltage across it. Both{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-7-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>I</mi><mi>s</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-27"
            style={{ width: "1.018em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.857em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.86em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-28">
                  <span className="msubsup" id="MathJax-Span-29">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "0.857em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.154em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-30"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          I
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.056em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.43em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-31"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          s
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.128em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>I</mi>
              <mi>s</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>{" "}
    and{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-8-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>T</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-32"
            style={{ width: "1.285em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.071em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1001.07em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-33">
                  <span className="msubsup" id="MathJax-Span-34">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.071em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-35"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-36"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          T
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.11em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.816em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>T</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>{" "}
    are known properties.
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-9-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi><mo>=</mo><msub><mi>I</mi><mi>s</mi></msub><msup><mi>e</mi><mrow class="MJX-TeXAtom-ORD"><mfrac><msub><mi>v</mi><mi>D</mi></msub><msub><mi>v</mi><mi>T</mi></msub></mfrac></mrow></msup></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-37"
            style={{ width: "5.024em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "4.276em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(0.857em, 1004.28em, 2.567em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-38">
                  <span
                    className="mi"
                    id="MathJax-Span-39"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-40"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="msubsup"
                    id="MathJax-Span-41"
                    style={{ paddingLeft: "0.27em" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "0.857em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.154em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-42"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          I
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.056em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.43em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-43"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          s
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span className="msubsup" id="MathJax-Span-44">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.605em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.43em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-45"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          e
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-4.538em",
                          left: "0.483em"
                        }}
                      >
                        <span className="texatom" id="MathJax-Span-46">
                          <span className="mrow" id="MathJax-Span-47">
                            <span className="mfrac" id="MathJax-Span-48">
                              <span
                                style={{
                                  display: "inline-block",
                                  position: "relative",
                                  width: "0.804em",
                                  height: 0,
                                  marginRight: "0.11em",
                                  marginLeft: "0.11em"
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    clip:
                                      "rect(3.635em, 1000.7em, 4.33em, -999.997em)",
                                    top: "-4.485em",
                                    left: "50%",
                                    marginLeft: "-0.318em"
                                  }}
                                >
                                  <span
                                    className="msubsup"
                                    id="MathJax-Span-49"
                                  >
                                    <span
                                      style={{
                                        display: "inline-block",
                                        position: "relative",
                                        width: "0.697em",
                                        height: 0
                                      }}
                                    >
                                      <span
                                        style={{
                                          position: "absolute",
                                          clip:
                                            "rect(3.635em, 1000.22em, 4.169em, -999.997em)",
                                          top: "-4.004em",
                                          left: "0em"
                                        }}
                                      >
                                        <span
                                          className="mi"
                                          id="MathJax-Span-50"
                                          style={{
                                            fontSize: "50%",
                                            fontFamily: "MathJax_Math-italic"
                                          }}
                                        >
                                          v
                                        </span>
                                        <span
                                          style={{
                                            display: "inline-block",
                                            width: 0,
                                            height: "4.009em"
                                          }}
                                        />
                                      </span>
                                      <span
                                        style={{
                                          position: "absolute",
                                          top: "-3.843em",
                                          left: "0.27em"
                                        }}
                                      >
                                        <span
                                          className="mi"
                                          id="MathJax-Span-51"
                                          style={{
                                            fontSize: "50%",
                                            fontFamily: "MathJax_Math-italic"
                                          }}
                                        >
                                          D
                                        </span>
                                        <span
                                          style={{
                                            display: "inline-block",
                                            width: 0,
                                            height: "4.009em"
                                          }}
                                        />
                                      </span>
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    clip:
                                      "rect(3.635em, 1000.64em, 4.33em, -999.997em)",
                                    top: "-3.737em",
                                    left: "50%",
                                    marginLeft: "-0.318em"
                                  }}
                                >
                                  <span
                                    className="msubsup"
                                    id="MathJax-Span-52"
                                  >
                                    <span
                                      style={{
                                        display: "inline-block",
                                        position: "relative",
                                        width: "0.644em",
                                        height: 0
                                      }}
                                    >
                                      <span
                                        style={{
                                          position: "absolute",
                                          clip:
                                            "rect(3.635em, 1000.22em, 4.169em, -999.997em)",
                                          top: "-4.004em",
                                          left: "0em"
                                        }}
                                      >
                                        <span
                                          className="mi"
                                          id="MathJax-Span-53"
                                          style={{
                                            fontSize: "50%",
                                            fontFamily: "MathJax_Math-italic"
                                          }}
                                        >
                                          v
                                        </span>
                                        <span
                                          style={{
                                            display: "inline-block",
                                            width: 0,
                                            height: "4.009em"
                                          }}
                                        />
                                      </span>
                                      <span
                                        style={{
                                          position: "absolute",
                                          top: "-3.843em",
                                          left: "0.27em"
                                        }}
                                      >
                                        <span
                                          className="mi"
                                          id="MathJax-Span-54"
                                          style={{
                                            fontSize: "50%",
                                            fontFamily: "MathJax_Math-italic"
                                          }}
                                        >
                                          T
                                          <span
                                            style={{
                                              display: "inline-block",
                                              overflow: "hidden",
                                              height: 1,
                                              width: "0.056em"
                                            }}
                                          />
                                        </span>
                                        <span
                                          style={{
                                            display: "inline-block",
                                            width: 0,
                                            height: "4.009em"
                                          }}
                                        />
                                      </span>
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    clip:
                                      "rect(0.857em, 1000.8em, 1.231em, -999.997em)",
                                    top: "-1.226em",
                                    left: "0em"
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      overflow: "hidden",
                                      verticalAlign: "0em",
                                      borderTop: "1.3px solid",
                                      width: "0.804em",
                                      height: 0
                                    }}
                                  />
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "1.071em"
                                    }}
                                  />
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.753em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
            <mo>=</mo>
            <msub>
              <mi>I</mi>
              <mi>s</mi>
            </msub>
            <msup>
              <mi>e</mi>
              <mrow className="MJX-TeXAtom-ORD">
                <mfrac>
                  <msub>
                    <mi>v</mi>
                    <mi>D</mi>
                  </msub>
                  <msub>
                    <mi>v</mi>
                    <mi>T</mi>
                  </msub>
                </mfrac>
              </mrow>
            </msup>
          </math>
        </span>
      </span>
    </span>
  </p>
  <p>Where:</p>
  <ul className="simple">
    <li>
      <span className="math notranslate nohighlight">
        <span
          className="MathJax_Preview"
          style={{ color: "inherit", display: "none" }}
        />
        <span
          className="MathJax"
          id="MathJax-Element-10-Frame"
            
          style={{ position: "relative" }}
          data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
          role="presentation"
        >
          <nobr aria-hidden="true">
            <span
              className="math"
              id="MathJax-Span-55"
              style={{ width: "0.59em", display: "inline-block" }}
            >
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "0.483em",
                  height: 0,
                  fontSize: "117%"
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                    top: "-2.188em",
                    left: "0em"
                  }}
                >
                  <span className="mrow" id="MathJax-Span-56">
                    <span
                      className="mi"
                      id="MathJax-Span-57"
                      style={{ fontFamily: "MathJax_Math-italic" }}
                    >
                      I
                      <span
                        style={{
                          display: "inline-block",
                          overflow: "hidden",
                          height: 1,
                          width: "0.056em"
                        }}
                      />
                    </span>
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 0,
                      height: "2.193em"
                    }}
                  />
                </span>
              </span>
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "-0.059em",
                  borderLeft: "0px solid",
                  width: 0,
                  height: "0.941em"
                }}
              />
            </span>
          </nobr>
          <span className="MJX_Assistive_MathML" role="presentation">
            <math xmlns="http://www.w3.org/1998/Math/MathML">
              <mi>I</mi>
            </math>
          </span>
        </span>
      </span>{" "}
      : diode current
    </li>
    <li>
      <span className="math notranslate nohighlight">
        <span
          className="MathJax_Preview"
          style={{ color: "inherit", display: "none" }}
        />
        <span
          className="MathJax"
          id="MathJax-Element-11-Frame"
            
          style={{ position: "relative" }}
          data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>I</mi><mi>s</mi></msub></math>'
          role="presentation"
        >
          <nobr aria-hidden="true">
            <span
              className="math"
              id="MathJax-Span-58"
              style={{ width: "1.018em", display: "inline-block" }}
            >
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "0.857em",
                  height: 0,
                  fontSize: "117%"
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    clip: "rect(1.338em, 1000.86em, 2.513em, -999.997em)",
                    top: "-2.188em",
                    left: "0em"
                  }}
                >
                  <span className="mrow" id="MathJax-Span-59">
                    <span className="msubsup" id="MathJax-Span-60">
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "0.857em",
                          height: 0
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            clip:
                              "rect(3.154em, 1000.48em, 4.169em, -999.997em)",
                            top: "-4.004em",
                            left: "0em"
                          }}
                        >
                          <span
                            className="mi"
                            id="MathJax-Span-61"
                            style={{ fontFamily: "MathJax_Math-italic" }}
                          >
                            I
                            <span
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                                height: 1,
                                width: "0.056em"
                              }}
                            />
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            top: "-3.843em",
                            left: "0.43em"
                          }}
                        >
                          <span
                            className="mi"
                            id="MathJax-Span-62"
                            style={{
                              fontSize: "70.7%",
                              fontFamily: "MathJax_Math-italic"
                            }}
                          >
                            s
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 0,
                      height: "2.193em"
                    }}
                  />
                </span>
              </span>
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "-0.247em",
                  borderLeft: "0px solid",
                  width: 0,
                  height: "1.128em"
                }}
              />
            </span>
          </nobr>
          <span className="MJX_Assistive_MathML" role="presentation">
            <math xmlns="http://www.w3.org/1998/Math/MathML">
              <msub>
                <mi>I</mi>
                <mi>s</mi>
              </msub>
            </math>
          </span>
        </span>
      </span>{" "}
      : reverse bias saturation current
    </li>
    <li>
      <span className="math notranslate nohighlight">
        <span
          className="MathJax_Preview"
          style={{ color: "inherit", display: "none" }}
        />
        <span
          className="MathJax"
          id="MathJax-Element-12-Frame"
            
          style={{ position: "relative" }}
          data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>D</mi></msub></math>'
          role="presentation"
        >
          <nobr aria-hidden="true">
            <span
              className="math"
              id="MathJax-Span-63"
              style={{ width: "1.338em", display: "inline-block" }}
            >
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "1.124em",
                  height: 0,
                  fontSize: "117%"
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    clip: "rect(1.605em, 1001.12em, 2.513em, -999.997em)",
                    top: "-2.188em",
                    left: "0em"
                  }}
                >
                  <span className="mrow" id="MathJax-Span-64">
                    <span className="msubsup" id="MathJax-Span-65">
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "1.124em",
                          height: 0
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            clip:
                              "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                            top: "-4.004em",
                            left: "0em"
                          }}
                        >
                          <span
                            className="mi"
                            id="MathJax-Span-66"
                            style={{ fontFamily: "MathJax_Math-italic" }}
                          >
                            v
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            top: "-3.843em",
                            left: "0.483em"
                          }}
                        >
                          <span
                            className="mi"
                            id="MathJax-Span-67"
                            style={{
                              fontSize: "70.7%",
                              fontFamily: "MathJax_Math-italic"
                            }}
                          >
                            D
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 0,
                      height: "2.193em"
                    }}
                  />
                </span>
              </span>
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "-0.247em",
                  borderLeft: "0px solid",
                  width: 0,
                  height: "0.816em"
                }}
              />
            </span>
          </nobr>
          <span className="MJX_Assistive_MathML" role="presentation">
            <math xmlns="http://www.w3.org/1998/Math/MathML">
              <msub>
                <mi>v</mi>
                <mi>D</mi>
              </msub>
            </math>
          </span>
        </span>
      </span>{" "}
      : diode voltage
    </li>
    <li>
      <span className="math notranslate nohighlight">
        <span
          className="MathJax_Preview"
          style={{ color: "inherit", display: "none" }}
        />
        <span
          className="MathJax"
          id="MathJax-Element-13-Frame"
            
          style={{ position: "relative" }}
          data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>T</mi></msub></math>'
          role="presentation"
        >
          <nobr aria-hidden="true">
            <span
              className="math"
              id="MathJax-Span-68"
              style={{ width: "1.285em", display: "inline-block" }}
            >
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "1.071em",
                  height: 0,
                  fontSize: "117%"
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    clip: "rect(1.605em, 1001.07em, 2.513em, -999.997em)",
                    top: "-2.188em",
                    left: "0em"
                  }}
                >
                  <span className="mrow" id="MathJax-Span-69">
                    <span className="msubsup" id="MathJax-Span-70">
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "1.071em",
                          height: 0
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            clip:
                              "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                            top: "-4.004em",
                            left: "0em"
                          }}
                        >
                          <span
                            className="mi"
                            id="MathJax-Span-71"
                            style={{ fontFamily: "MathJax_Math-italic" }}
                          >
                            v
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            top: "-3.843em",
                            left: "0.483em"
                          }}
                        >
                          <span
                            className="mi"
                            id="MathJax-Span-72"
                            style={{
                              fontSize: "70.7%",
                              fontFamily: "MathJax_Math-italic"
                            }}
                          >
                            T
                            <span
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                                height: 1,
                                width: "0.11em"
                              }}
                            />
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 0,
                      height: "2.193em"
                    }}
                  />
                </span>
              </span>
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "-0.247em",
                  borderLeft: "0px solid",
                  width: 0,
                  height: "0.816em"
                }}
              />
            </span>
          </nobr>
          <span className="MJX_Assistive_MathML" role="presentation">
            <math xmlns="http://www.w3.org/1998/Math/MathML">
              <msub>
                <mi>v</mi>
                <mi>T</mi>
              </msub>
            </math>
          </span>
        </span>
      </span>{" "}
      : thermal voltage
    </li>
  </ul>
  <p>
    Which can be formulated over{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-14-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>D</mi></msub></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-73"
            style={{ width: "1.338em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.124em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1001.12em, 2.513em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-74">
                  <span className="msubsup" id="MathJax-Span-75">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-76"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-77"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          D
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.816em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>D</mi>
            </msub>
          </math>
        </span>
      </span>
    </span>
    :
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-15-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>D</mi></msub><mo>=</mo><msub><mi>v</mi><mi>T</mi></msub><mi>log</mi><mo>&#x2061;</mo><mrow class="MJX-TeXAtom-ORD"><mrow><mo>|</mo><mfrac><mi>I</mi><msub><mi>I</mi><mi>s</mi></msub></mfrac><mo>|</mo></mrow></mrow></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-78"
            style={{ width: "7.695em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "6.573em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(2.086em, 1006.47em, 3.902em, -999.997em)",
                  top: "-3.256em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-79">
                  <span className="msubsup" id="MathJax-Span-80">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-81"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-82"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          D
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-83"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="msubsup"
                    id="MathJax-Span-84"
                    style={{ paddingLeft: "0.27em" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.071em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-85"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-86"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          T
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.11em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-87"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.163em"
                    }}
                  >
                    log
                  </span>
                  <span className="mo" id="MathJax-Span-88" />
                  <span
                    className="texatom"
                    id="MathJax-Span-89"
                    style={{ paddingLeft: "0.163em" }}
                  >
                    <span className="mrow" id="MathJax-Span-90">
                      <span className="mrow" id="MathJax-Span-91">
                        <span
                          className="mo"
                          id="MathJax-Span-92"
                          style={{ verticalAlign: "1.018em" }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "0.27em",
                              height: 0
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-3.256em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-2.722em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                          </span>
                        </span>
                        <span className="mfrac" id="MathJax-Span-93">
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "0.697em",
                              height: 0,
                              marginRight: "0.11em",
                              marginLeft: "0.11em"
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                clip:
                                  "rect(3.368em, 1000.38em, 4.169em, -999.997em)",
                                top: "-4.431em",
                                left: "50%",
                                marginLeft: "-0.158em"
                              }}
                            >
                              <span
                                className="mi"
                                id="MathJax-Span-94"
                                style={{
                                  fontSize: "70.7%",
                                  fontFamily: "MathJax_Math-italic"
                                }}
                              >
                                I
                                <span
                                  style={{
                                    display: "inline-block",
                                    overflow: "hidden",
                                    height: 1,
                                    width: "0.056em"
                                  }}
                                />
                              </span>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                clip:
                                  "rect(3.368em, 1000.59em, 4.276em, -999.997em)",
                                top: "-3.63em",
                                left: "50%",
                                marginLeft: "-0.318em"
                              }}
                            >
                              <span className="msubsup" id="MathJax-Span-95">
                                <span
                                  style={{
                                    display: "inline-block",
                                    position: "relative",
                                    width: "0.59em",
                                    height: 0
                                  }}
                                >
                                  <span
                                    style={{
                                      position: "absolute",
                                      clip:
                                        "rect(3.368em, 1000.38em, 4.169em, -999.997em)",
                                      top: "-4.004em",
                                      left: "0em"
                                    }}
                                  >
                                    <span
                                      className="mi"
                                      id="MathJax-Span-96"
                                      style={{
                                        fontSize: "70.7%",
                                        fontFamily: "MathJax_Math-italic"
                                      }}
                                    >
                                      I
                                      <span
                                        style={{
                                          display: "inline-block",
                                          overflow: "hidden",
                                          height: 1,
                                          width: "0.056em"
                                        }}
                                      />
                                    </span>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: 0,
                                        height: "4.009em"
                                      }}
                                    />
                                  </span>
                                  <span
                                    style={{
                                      position: "absolute",
                                      top: "-3.897em",
                                      left: "0.323em"
                                    }}
                                  >
                                    <span
                                      className="mi"
                                      id="MathJax-Span-97"
                                      style={{
                                        fontSize: "50%",
                                        fontFamily: "MathJax_Math-italic"
                                      }}
                                    >
                                      s
                                    </span>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: 0,
                                        height: "4.009em"
                                      }}
                                    />
                                  </span>
                                </span>
                              </span>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                clip:
                                  "rect(0.857em, 1000.7em, 1.231em, -999.997em)",
                                top: "-1.279em",
                                left: "0em"
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  overflow: "hidden",
                                  verticalAlign: "0em",
                                  borderTop: "1.3px solid",
                                  width: "0.697em",
                                  height: 0
                                }}
                              />
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "1.071em"
                                }}
                              />
                            </span>
                          </span>
                        </span>
                        <span
                          className="mo"
                          id="MathJax-Span-98"
                          style={{ verticalAlign: "1.018em" }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "0.27em",
                              height: 0
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-3.256em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-2.722em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "3.261em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.622em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.878em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>D</mi>
            </msub>
            <mo>=</mo>
            <msub>
              <mi>v</mi>
              <mi>T</mi>
            </msub>
            <mi>log</mi>
            <mo>⁡</mo>
            <mrow className="MJX-TeXAtom-ORD">
              <mrow>
                <mo>|</mo>
                <mfrac>
                  <mi>I</mi>
                  <msub>
                    <mi>I</mi>
                    <mi>s</mi>
                  </msub>
                </mfrac>
                <mo>|</mo>
              </mrow>
            </mrow>
          </math>
        </span>
      </span>
    </span>
  </p>
  <p>
    The voltage over the resistor can be written as a function of the resistor’s
    resistance{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-16-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>R</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-99"
            style={{ width: "0.911em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.751em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.75em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-100">
                  <span
                    className="mi"
                    id="MathJax-Span-101"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    R
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>R</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    and the current{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-17-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-102"
            style={{ width: "0.59em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.483em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-103">
                  <span
                    className="mi"
                    id="MathJax-Span-104"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>
    :
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-18-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>R</mi></msub><mo>=</mo><mi>R</mi><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-105"
            style={{ width: "4.33em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "3.689em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1003.69em, 2.567em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-106">
                  <span className="msubsup" id="MathJax-Span-107">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.124em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-108"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-109"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          R
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-110"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-111"
                    style={{
                      fontFamily: "MathJax_Math-italic",
                      paddingLeft: "0.27em"
                    }}
                  >
                    R
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-112"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.128em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>R</mi>
            </msub>
            <mo>=</mo>
            <mi>R</mi>
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>
  </p>
  <p>
    And by replacing these expressions on the Kirschhoff’s voltage law equation,
    the following equation is obtained:
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-19-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>U</mi><mo>=</mo><msub><mi>v</mi><mi>T</mi></msub><mi>log</mi><mo>&#x2061;</mo><mrow class="MJX-TeXAtom-ORD"><mrow><mo>|</mo><mfrac><mi>I</mi><msub><mi>I</mi><mi>s</mi></msub></mfrac><mo>|</mo></mrow></mrow><mo>+</mo><mi>R</mi><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-113"
            style={{ width: "10.206em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "8.71em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(2.086em, 1008.71em, 3.902em, -999.997em)",
                  top: "-3.256em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-114">
                  <span
                    className="mi"
                    id="MathJax-Span-115"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    U
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.11em"
                      }}
                    />
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-116"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="msubsup"
                    id="MathJax-Span-117"
                    style={{ paddingLeft: "0.27em" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.071em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-118"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-119"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          T
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.11em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-120"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.163em"
                    }}
                  >
                    log
                  </span>
                  <span className="mo" id="MathJax-Span-121" />
                  <span
                    className="texatom"
                    id="MathJax-Span-122"
                    style={{ paddingLeft: "0.163em" }}
                  >
                    <span className="mrow" id="MathJax-Span-123">
                      <span className="mrow" id="MathJax-Span-124">
                        <span
                          className="mo"
                          id="MathJax-Span-125"
                          style={{ verticalAlign: "1.018em" }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "0.27em",
                              height: 0
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-3.256em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-2.722em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                          </span>
                        </span>
                        <span className="mfrac" id="MathJax-Span-126">
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "0.697em",
                              height: 0,
                              marginRight: "0.11em",
                              marginLeft: "0.11em"
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                clip:
                                  "rect(3.368em, 1000.38em, 4.169em, -999.997em)",
                                top: "-4.431em",
                                left: "50%",
                                marginLeft: "-0.158em"
                              }}
                            >
                              <span
                                className="mi"
                                id="MathJax-Span-127"
                                style={{
                                  fontSize: "70.7%",
                                  fontFamily: "MathJax_Math-italic"
                                }}
                              >
                                I
                                <span
                                  style={{
                                    display: "inline-block",
                                    overflow: "hidden",
                                    height: 1,
                                    width: "0.056em"
                                  }}
                                />
                              </span>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                clip:
                                  "rect(3.368em, 1000.59em, 4.276em, -999.997em)",
                                top: "-3.63em",
                                left: "50%",
                                marginLeft: "-0.318em"
                              }}
                            >
                              <span className="msubsup" id="MathJax-Span-128">
                                <span
                                  style={{
                                    display: "inline-block",
                                    position: "relative",
                                    width: "0.59em",
                                    height: 0
                                  }}
                                >
                                  <span
                                    style={{
                                      position: "absolute",
                                      clip:
                                        "rect(3.368em, 1000.38em, 4.169em, -999.997em)",
                                      top: "-4.004em",
                                      left: "0em"
                                    }}
                                  >
                                    <span
                                      className="mi"
                                      id="MathJax-Span-129"
                                      style={{
                                        fontSize: "70.7%",
                                        fontFamily: "MathJax_Math-italic"
                                      }}
                                    >
                                      I
                                      <span
                                        style={{
                                          display: "inline-block",
                                          overflow: "hidden",
                                          height: 1,
                                          width: "0.056em"
                                        }}
                                      />
                                    </span>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: 0,
                                        height: "4.009em"
                                      }}
                                    />
                                  </span>
                                  <span
                                    style={{
                                      position: "absolute",
                                      top: "-3.897em",
                                      left: "0.323em"
                                    }}
                                  >
                                    <span
                                      className="mi"
                                      id="MathJax-Span-130"
                                      style={{
                                        fontSize: "50%",
                                        fontFamily: "MathJax_Math-italic"
                                      }}
                                    >
                                      s
                                    </span>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: 0,
                                        height: "4.009em"
                                      }}
                                    />
                                  </span>
                                </span>
                              </span>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                clip:
                                  "rect(0.857em, 1000.7em, 1.231em, -999.997em)",
                                top: "-1.279em",
                                left: "0em"
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  overflow: "hidden",
                                  verticalAlign: "0em",
                                  borderTop: "1.3px solid",
                                  width: "0.697em",
                                  height: 0
                                }}
                              />
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "1.071em"
                                }}
                              />
                            </span>
                          </span>
                        </span>
                        <span
                          className="mo"
                          id="MathJax-Span-131"
                          style={{ verticalAlign: "1.018em" }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "0.27em",
                              height: 0
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-3.256em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                fontFamily: "MathJax_Main",
                                top: "-2.722em",
                                left: "0em"
                              }}
                            >
                              ∣
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 0,
                                  height: "4.009em"
                                }}
                              />
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-132"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.216em"
                    }}
                  >
                    +
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-133"
                    style={{
                      fontFamily: "MathJax_Math-italic",
                      paddingLeft: "0.216em"
                    }}
                  >
                    R
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-134"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "3.261em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.622em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.878em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>U</mi>
            <mo>=</mo>
            <msub>
              <mi>v</mi>
              <mi>T</mi>
            </msub>
            <mi>log</mi>
            <mo>⁡</mo>
            <mrow className="MJX-TeXAtom-ORD">
              <mrow>
                <mo>|</mo>
                <mfrac>
                  <mi>I</mi>
                  <msub>
                    <mi>I</mi>
                    <mi>s</mi>
                  </msub>
                </mfrac>
                <mo>|</mo>
              </mrow>
            </mrow>
            <mo>+</mo>
            <mi>R</mi>
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>
  </p>
  <p>
    To find the solution of the problem, the previous equation needs to be
    solved for{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-20-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-135"
            style={{ width: "0.59em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.483em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-136">
                  <span
                    className="mi"
                    id="MathJax-Span-137"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>
    , which is the same as finding{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-21-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-138"
            style={{ width: "0.59em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.483em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-139">
                  <span
                    className="mi"
                    id="MathJax-Span-140"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    such that the cost function{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-22-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>c</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-141"
            style={{ width: "0.537em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.43em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.605em, 1000.43em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-142">
                  <span
                    className="mi"
                    id="MathJax-Span-143"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    c
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.628em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>c</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    equals zero, as shown below. By doing this, solving for{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-23-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-144"
            style={{ width: "0.59em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.483em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-145">
                  <span
                    className="mi"
                    id="MathJax-Span-146"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    is restructured as a minimization problem. The absolute value is necessary
    because we don’t want to obtain negative currents.
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-24-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>c</mi><mo>=</mo><mrow><mo>|</mo><mrow><mi>U</mi><mo>&#x2212;</mo><msub><mi>v</mi><mi>T</mi></msub><mi>log</mi><mo>&#x2061;</mo><mrow class="MJX-TeXAtom-ORD"><mrow><mo>|</mo><mfrac><mi>I</mi><msub><mi>I</mi><mi>s</mi></msub></mfrac><mo>|</mo></mrow></mrow><mo>&#x2212;</mo><mi>R</mi><mi>I</mi></mrow><mo>|</mo></mrow></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-147"
            style={{ width: "12.77em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "10.9em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(2.086em, 1010.79em, 3.902em, -999.997em)",
                  top: "-3.256em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-148">
                  <span
                    className="mi"
                    id="MathJax-Span-149"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    c
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-150"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mrow"
                    id="MathJax-Span-151"
                    style={{ paddingLeft: "0.27em" }}
                  >
                    <span
                      className="mo"
                      id="MathJax-Span-152"
                      style={{ verticalAlign: "1.018em" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "0.27em",
                          height: 0
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            fontFamily: "MathJax_Main",
                            top: "-3.256em",
                            left: "0em"
                          }}
                        >
                          ∣
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            fontFamily: "MathJax_Main",
                            top: "-2.722em",
                            left: "0em"
                          }}
                        >
                          ∣
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                      </span>
                    </span>
                    <span className="mrow" id="MathJax-Span-153">
                      <span
                        className="mi"
                        id="MathJax-Span-154"
                        style={{ fontFamily: "MathJax_Math-italic" }}
                      >
                        U
                        <span
                          style={{
                            display: "inline-block",
                            overflow: "hidden",
                            height: 1,
                            width: "0.11em"
                          }}
                        />
                      </span>
                      <span
                        className="mo"
                        id="MathJax-Span-155"
                        style={{
                          fontFamily: "MathJax_Main",
                          paddingLeft: "0.216em"
                        }}
                      >
                        −
                      </span>
                      <span
                        className="msubsup"
                        id="MathJax-Span-156"
                        style={{ paddingLeft: "0.216em" }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            position: "relative",
                            width: "1.071em",
                            height: 0
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              clip:
                                "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                              top: "-4.004em",
                              left: "0em"
                            }}
                          >
                            <span
                              className="mi"
                              id="MathJax-Span-157"
                              style={{ fontFamily: "MathJax_Math-italic" }}
                            >
                              v
                            </span>
                            <span
                              style={{
                                display: "inline-block",
                                width: 0,
                                height: "4.009em"
                              }}
                            />
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "-3.843em",
                              left: "0.483em"
                            }}
                          >
                            <span
                              className="mi"
                              id="MathJax-Span-158"
                              style={{
                                fontSize: "70.7%",
                                fontFamily: "MathJax_Math-italic"
                              }}
                            >
                              T
                              <span
                                style={{
                                  display: "inline-block",
                                  overflow: "hidden",
                                  height: 1,
                                  width: "0.11em"
                                }}
                              />
                            </span>
                            <span
                              style={{
                                display: "inline-block",
                                width: 0,
                                height: "4.009em"
                              }}
                            />
                          </span>
                        </span>
                      </span>
                      <span
                        className="mi"
                        id="MathJax-Span-159"
                        style={{
                          fontFamily: "MathJax_Main",
                          paddingLeft: "0.163em"
                        }}
                      >
                        log
                      </span>
                      <span className="mo" id="MathJax-Span-160" />
                      <span
                        className="texatom"
                        id="MathJax-Span-161"
                        style={{ paddingLeft: "0.163em" }}
                      >
                        <span className="mrow" id="MathJax-Span-162">
                          <span className="mrow" id="MathJax-Span-163">
                            <span
                              className="mo"
                              id="MathJax-Span-164"
                              style={{ verticalAlign: "1.018em" }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  position: "relative",
                                  width: "0.27em",
                                  height: 0
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    fontFamily: "MathJax_Main",
                                    top: "-3.256em",
                                    left: "0em"
                                  }}
                                >
                                  ∣
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    fontFamily: "MathJax_Main",
                                    top: "-2.722em",
                                    left: "0em"
                                  }}
                                >
                                  ∣
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                              </span>
                            </span>
                            <span className="mfrac" id="MathJax-Span-165">
                              <span
                                style={{
                                  display: "inline-block",
                                  position: "relative",
                                  width: "0.697em",
                                  height: 0,
                                  marginRight: "0.11em",
                                  marginLeft: "0.11em"
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    clip:
                                      "rect(3.368em, 1000.38em, 4.169em, -999.997em)",
                                    top: "-4.431em",
                                    left: "50%",
                                    marginLeft: "-0.158em"
                                  }}
                                >
                                  <span
                                    className="mi"
                                    id="MathJax-Span-166"
                                    style={{
                                      fontSize: "70.7%",
                                      fontFamily: "MathJax_Math-italic"
                                    }}
                                  >
                                    I
                                    <span
                                      style={{
                                        display: "inline-block",
                                        overflow: "hidden",
                                        height: 1,
                                        width: "0.056em"
                                      }}
                                    />
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    clip:
                                      "rect(3.368em, 1000.59em, 4.276em, -999.997em)",
                                    top: "-3.63em",
                                    left: "50%",
                                    marginLeft: "-0.318em"
                                  }}
                                >
                                  <span
                                    className="msubsup"
                                    id="MathJax-Span-167"
                                  >
                                    <span
                                      style={{
                                        display: "inline-block",
                                        position: "relative",
                                        width: "0.59em",
                                        height: 0
                                      }}
                                    >
                                      <span
                                        style={{
                                          position: "absolute",
                                          clip:
                                            "rect(3.368em, 1000.38em, 4.169em, -999.997em)",
                                          top: "-4.004em",
                                          left: "0em"
                                        }}
                                      >
                                        <span
                                          className="mi"
                                          id="MathJax-Span-168"
                                          style={{
                                            fontSize: "70.7%",
                                            fontFamily: "MathJax_Math-italic"
                                          }}
                                        >
                                          I
                                          <span
                                            style={{
                                              display: "inline-block",
                                              overflow: "hidden",
                                              height: 1,
                                              width: "0.056em"
                                            }}
                                          />
                                        </span>
                                        <span
                                          style={{
                                            display: "inline-block",
                                            width: 0,
                                            height: "4.009em"
                                          }}
                                        />
                                      </span>
                                      <span
                                        style={{
                                          position: "absolute",
                                          top: "-3.897em",
                                          left: "0.323em"
                                        }}
                                      >
                                        <span
                                          className="mi"
                                          id="MathJax-Span-169"
                                          style={{
                                            fontSize: "50%",
                                            fontFamily: "MathJax_Math-italic"
                                          }}
                                        >
                                          s
                                        </span>
                                        <span
                                          style={{
                                            display: "inline-block",
                                            width: 0,
                                            height: "4.009em"
                                          }}
                                        />
                                      </span>
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    clip:
                                      "rect(0.857em, 1000.7em, 1.231em, -999.997em)",
                                    top: "-1.279em",
                                    left: "0em"
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      overflow: "hidden",
                                      verticalAlign: "0em",
                                      borderTop: "1.3px solid",
                                      width: "0.697em",
                                      height: 0
                                    }}
                                  />
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "1.071em"
                                    }}
                                  />
                                </span>
                              </span>
                            </span>
                            <span
                              className="mo"
                              id="MathJax-Span-170"
                              style={{ verticalAlign: "1.018em" }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  position: "relative",
                                  width: "0.27em",
                                  height: 0
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    fontFamily: "MathJax_Main",
                                    top: "-3.256em",
                                    left: "0em"
                                  }}
                                >
                                  ∣
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    fontFamily: "MathJax_Main",
                                    top: "-2.722em",
                                    left: "0em"
                                  }}
                                >
                                  ∣
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 0,
                                      height: "4.009em"
                                    }}
                                  />
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span
                        className="mo"
                        id="MathJax-Span-171"
                        style={{
                          fontFamily: "MathJax_Main",
                          paddingLeft: "0.216em"
                        }}
                      >
                        −
                      </span>
                      <span
                        className="mi"
                        id="MathJax-Span-172"
                        style={{
                          fontFamily: "MathJax_Math-italic",
                          paddingLeft: "0.216em"
                        }}
                      >
                        R
                      </span>
                      <span
                        className="mi"
                        id="MathJax-Span-173"
                        style={{ fontFamily: "MathJax_Math-italic" }}
                      >
                        I
                        <span
                          style={{
                            display: "inline-block",
                            overflow: "hidden",
                            height: 1,
                            width: "0.056em"
                          }}
                        />
                      </span>
                    </span>
                    <span
                      className="mo"
                      id="MathJax-Span-174"
                      style={{ verticalAlign: "1.018em" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "0.27em",
                          height: 0
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            fontFamily: "MathJax_Main",
                            top: "-3.256em",
                            left: "0em"
                          }}
                        >
                          ∣
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            fontFamily: "MathJax_Main",
                            top: "-2.722em",
                            left: "0em"
                          }}
                        >
                          ∣
                          <span
                            style={{
                              display: "inline-block",
                              width: 0,
                              height: "4.009em"
                            }}
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "3.261em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.622em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.878em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>c</mi>
            <mo>=</mo>
            <mrow>
              <mo>|</mo>
              <mrow>
                <mi>U</mi>
                <mo>−</mo>
                <msub>
                  <mi>v</mi>
                  <mi>T</mi>
                </msub>
                <mi>log</mi>
                <mo>⁡</mo>
                <mrow className="MJX-TeXAtom-ORD">
                  <mrow>
                    <mo>|</mo>
                    <mfrac>
                      <mi>I</mi>
                      <msub>
                        <mi>I</mi>
                        <mi>s</mi>
                      </msub>
                    </mfrac>
                    <mo>|</mo>
                  </mrow>
                </mrow>
                <mo>−</mo>
                <mi>R</mi>
                <mi>I</mi>
              </mrow>
              <mo>|</mo>
            </mrow>
          </math>
        </span>
      </span>
    </span>
  </p>
</div>

              </Typography>
              
              )}
              {activeStep===1&&(
                <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                <div className="section" id="Known-parameter-values">
  <h3>
    Known parameter values
  </h3>
  <p>
    The voltage of the source is{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-25-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>10</mn><mtext>&#xA0;</mtext><mi>V</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-175"
            style={{ width: "2.353em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "1.979em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1001.98em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-176">
                  <span
                    className="mn"
                    id="MathJax-Span-177"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    10
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-178"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-179"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    V
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.163em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mn>10</mn>
            <mtext>&nbsp;</mtext>
            <mi>V</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    and the resistance of the resistor is{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-26-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>100</mn><mtext>&#xA0;</mtext><mi mathvariant="normal">&#x03A9;</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-180"
            style={{ width: "2.887em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "2.46em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1002.41em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-181">
                  <span
                    className="mn"
                    id="MathJax-Span-182"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    100
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-183"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-184"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    Ω
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.003em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mn>100</mn>
            <mtext>&nbsp;</mtext>
            <mi mathvariant="normal">Ω</mi>
          </math>
        </span>
      </span>
    </span>
    . The diode is a silicon diode and it is assumed to be at room temperature.
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-27-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>U</mi><mo>=</mo><mn>10</mn><mtext>&#xA0;</mtext><mi>V</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-185"
            style={{ width: "4.81em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "4.116em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1004.12em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-186">
                  <span
                    className="mi"
                    id="MathJax-Span-187"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    U
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.11em"
                      }}
                    />
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-188"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-189"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    10
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-190"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-191"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    V
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.163em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>U</mi>
            <mo>=</mo>
            <mn>10</mn>
            <mtext>&nbsp;</mtext>
            <mi>V</mi>
          </math>
        </span>
      </span>
    </span>
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-28-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>R</mi><mo>=</mo><mn>100</mn><mtext>&#xA0;</mtext><mi mathvariant="normal">&#x03A9;</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-192"
            style={{ width: "5.345em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "4.543em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1004.49em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-193">
                  <span
                    className="mi"
                    id="MathJax-Span-194"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    R
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-195"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-196"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    100
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-197"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-198"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    Ω
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.003em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>R</mi>
            <mo>=</mo>
            <mn>100</mn>
            <mtext>&nbsp;</mtext>
            <mi mathvariant="normal">Ω</mi>
          </math>
        </span>
      </span>
    </span>
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-29-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>I</mi><mi>s</mi></msub><mo>=</mo><mn>9.4</mn><mtext>&#xA0;</mtext><mi>p</mi><mi>A</mi><mo>=</mo><mn>9.4</mn><mo>&#x00D7;</mo><msup><mn>10</mn><mrow class="MJX-TeXAtom-ORD"><mo>&#x2212;</mo><mn>12</mn></mrow></msup><mtext>&#xA0;</mtext><mi>A</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-199"
            style={{ width: "14.212em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "12.129em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.231em, 1012.13em, 2.62em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-200">
                  <span className="msubsup" id="MathJax-Span-201">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "0.857em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.154em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-202"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          I
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.056em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.43em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-203"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          s
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-204"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-205"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    9.4
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-206"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-207"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    p
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-208"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    A
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-209"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-210"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    9.4
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-211"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.216em"
                    }}
                  >
                    ×
                  </span>
                  <span
                    className="msubsup"
                    id="MathJax-Span-212"
                    style={{ paddingLeft: "0.216em" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "2.353em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.208em, 1000.96em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mn"
                          id="MathJax-Span-213"
                          style={{ fontFamily: "MathJax_Main" }}
                        >
                          10
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-4.378em",
                          left: "1.018em"
                        }}
                      >
                        <span className="texatom" id="MathJax-Span-214">
                          <span className="mrow" id="MathJax-Span-215">
                            <span
                              className="mo"
                              id="MathJax-Span-216"
                              style={{
                                fontSize: "70.7%",
                                fontFamily: "MathJax_Main"
                              }}
                            >
                              −
                            </span>
                            <span
                              className="mn"
                              id="MathJax-Span-217"
                              style={{
                                fontSize: "70.7%",
                                fontFamily: "MathJax_Main"
                              }}
                            >
                              12
                            </span>
                          </span>
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-218"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-219"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    A
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.309em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.378em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>I</mi>
              <mi>s</mi>
            </msub>
            <mo>=</mo>
            <mn>9.4</mn>
            <mtext>&nbsp;</mtext>
            <mi>p</mi>
            <mi>A</mi>
            <mo>=</mo>
            <mn>9.4</mn>
            <mo>×</mo>
            <msup>
              <mn>10</mn>
              <mrow className="MJX-TeXAtom-ORD">
                <mo>−</mo>
                <mn>12</mn>
              </mrow>
            </msup>
            <mtext>&nbsp;</mtext>
            <mi>A</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    (reverse bias saturation current of silicon diodes at room temperature,{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-30-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>T</mi><mo>=</mo><mn>300</mn><mtext>&#xA0;</mtext><mi>K</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-220"
            style={{ width: "5.451em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "4.65em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1004.65em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-221">
                  <span
                    className="mi"
                    id="MathJax-Span-222"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    T
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.11em"
                      }}
                    />
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-223"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-224"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    300
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-225"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-226"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    K
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>T</mi>
            <mo>=</mo>
            <mn>300</mn>
            <mtext>&nbsp;</mtext>
            <mi>K</mi>
          </math>
        </span>
      </span>
    </span>
    )
  </p>
  <p>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-31-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>v</mi><mi>T</mi></msub><mo>=</mo><mn>25.85</mn><mtext>&#xA0;</mtext><mi>m</mi><mi>V</mi><mo>=</mo><mn>25.85</mn><mo>&#x00D7;</mo><msup><mn>10</mn><mrow class="MJX-TeXAtom-ORD"><mo>&#x2212;</mo><mn>3</mn></mrow></msup><mtext>&#xA0;</mtext><mi>V</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-227"
            style={{ width: "16.776em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "14.319em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.231em, 1014.32em, 2.567em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-228">
                  <span className="msubsup" id="MathJax-Span-229">
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.071em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.421em, 1000.48em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-230"
                          style={{ fontFamily: "MathJax_Math-italic" }}
                        >
                          v
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-3.843em",
                          left: "0.483em"
                        }}
                      >
                        <span
                          className="mi"
                          id="MathJax-Span-231"
                          style={{
                            fontSize: "70.7%",
                            fontFamily: "MathJax_Math-italic"
                          }}
                        >
                          T
                          <span
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                              height: 1,
                              width: "0.11em"
                            }}
                          />
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-232"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-233"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    25.85
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-234"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-235"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    m
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-236"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    V
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.163em"
                      }}
                    />
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-237"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-238"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    25.85
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-239"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.216em"
                    }}
                  >
                    ×
                  </span>
                  <span
                    className="msubsup"
                    id="MathJax-Span-240"
                    style={{ paddingLeft: "0.216em" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "1.979em",
                        height: 0
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          clip: "rect(3.208em, 1000.96em, 4.169em, -999.997em)",
                          top: "-4.004em",
                          left: "0em"
                        }}
                      >
                        <span
                          className="mn"
                          id="MathJax-Span-241"
                          style={{ fontFamily: "MathJax_Main" }}
                        >
                          10
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "-4.378em",
                          left: "1.018em"
                        }}
                      >
                        <span className="texatom" id="MathJax-Span-242">
                          <span className="mrow" id="MathJax-Span-243">
                            <span
                              className="mo"
                              id="MathJax-Span-244"
                              style={{
                                fontSize: "70.7%",
                                fontFamily: "MathJax_Main"
                              }}
                            >
                              −
                            </span>
                            <span
                              className="mn"
                              id="MathJax-Span-245"
                              style={{
                                fontSize: "70.7%",
                                fontFamily: "MathJax_Main"
                              }}
                            >
                              3
                            </span>
                          </span>
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 0,
                            height: "4.009em"
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-246"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-247"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    V
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.163em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.247em",
                borderLeft: "0px solid",
                width: 0,
                height: "1.316em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <msub>
              <mi>v</mi>
              <mi>T</mi>
            </msub>
            <mo>=</mo>
            <mn>25.85</mn>
            <mtext>&nbsp;</mtext>
            <mi>m</mi>
            <mi>V</mi>
            <mo>=</mo>
            <mn>25.85</mn>
            <mo>×</mo>
            <msup>
              <mn>10</mn>
              <mrow className="MJX-TeXAtom-ORD">
                <mo>−</mo>
                <mn>3</mn>
              </mrow>
            </msup>
            <mtext>&nbsp;</mtext>
            <mi>V</mi>
          </math>
        </span>
      </span>
    </span>{" "}
    (thermal voltage at room temperature,{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-32-Frame"
          
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>T</mi><mo>=</mo><mn>300</mn><mtext>&#xA0;</mtext><mi>K</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-248"
            style={{ width: "5.451em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "4.65em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1004.65em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-249">
                  <span
                    className="mi"
                    id="MathJax-Span-250"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    T
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.11em"
                      }}
                    />
                  </span>
                  <span
                    className="mo"
                    id="MathJax-Span-251"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    =
                  </span>
                  <span
                    className="mn"
                    id="MathJax-Span-252"
                    style={{
                      fontFamily: "MathJax_Main",
                      paddingLeft: "0.27em"
                    }}
                  >
                    300
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-253"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-254"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    K
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>T</mi>
            <mo>=</mo>
            <mn>300</mn>
            <mtext>&nbsp;</mtext>
            <mi>K</mi>
          </math>
        </span>
      </span>
    </span>
    )
  </p>
</div>

                </Typography>
</>
              )}
              {activeStep===2&&(
                
                <Typography sx={{ mt: 2, mb: 1 }}>
                  
                  <div className="section" id="Defining-the-cost-fuction">
  <h3>
    Defining the cost fuction
  </h3>
  <p>
    The first argument of the cost function is a{" "}
    <code className="docutils literal notranslate">
      <span className="pre">numpy.ndarray</span>
    </code>
    . Each dimension of this array represents an unknown variable. In this
    problem, the unknown variable is just{" "}
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-33-Frame"
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>I</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-255"
            style={{ width: "0.59em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "0.483em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.338em, 1000.48em, 2.353em, -999.997em)",
                  top: "-2.188em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-256">
                  <span
                    className="mi"
                    id="MathJax-Span-257"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    I
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.056em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.193em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>I</mi>
          </math>
        </span>
      </span>
    </span>
    <span className="math notranslate nohighlight">
      <span
        className="MathJax_Preview"
        style={{ color: "inherit", display: "none" }}
      />
      <span
        className="MathJax"
        id="MathJax-Element-34-Frame"
        style={{ position: "relative" }}
        data-mathml='<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>25.85</mn><mtext>&#xA0;</mtext><mi>m</mi><mi>V</mi></math>'
        role="presentation"
      >
        <nobr aria-hidden="true">
          <span
            className="math"
            id="MathJax-Span-258"
            style={{ width: "4.917em", display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                position: "relative",
                width: "4.169em",
                height: 0,
                fontSize: "117%"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  clip: "rect(1.392em, 1004.17em, 2.407em, -999.997em)",
                  top: "-2.241em",
                  left: "0em"
                }}
              >
                <span className="mrow" id="MathJax-Span-259">
                  <span
                    className="mn"
                    id="MathJax-Span-260"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    25.85
                  </span>
                  <span
                    className="mtext"
                    id="MathJax-Span-261"
                    style={{ fontFamily: "MathJax_Main" }}
                  >
                    &nbsp;
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-262"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    m
                  </span>
                  <span
                    className="mi"
                    id="MathJax-Span-263"
                    style={{ fontFamily: "MathJax_Math-italic" }}
                  >
                    V
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        height: 1,
                        width: "0.163em"
                      }}
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "2.246em"
                  }}
                />
              </span>
            </span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "-0.059em",
                borderLeft: "0px solid",
                width: 0,
                height: "0.941em"
              }}
            />
          </span>
        </nobr>
        <span className="MJX_Assistive_MathML" role="presentation">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mn>25.85</mn>
            <mtext>&nbsp;</mtext>
            <mi>m</mi>
            <mi>V</mi>
          </math>
        </span>
      </span>
    </span>
    .
  </p>
  <div className="nbinput nblast docutils container">
    <div className="prompt highlight-none notranslate">
      <div className="highlight">
        <pre>
          <span />
          
        </pre>
      </div>
    </div>
    <div className="input_area highlight-ipython3 notranslate">
      <div className="highlight">
        <pre>
          <span />
          <span className="k">def</span>{" "}
          <span className="nf">cost_function</span>
          <span className="p">(</span>
          <span className="n">I</span>
          <span className="p">):</span>
          {"\n"}
          {"    "}
          <span className="c1">#Fixed parameters</span>
          {"\n"}
          {"    "}
          <span className="n">U</span> <span className="o">=</span>{" "}
          <span className="mi">10</span>
          {"\n"}
          {"    "}
          <span className="n">R</span> <span className="o">=</span>{" "}
          <span className="mi">100</span>
          {"\n"}
          {"    "}
          <span className="n">I_s</span> <span className="o">=</span>{" "}
          <span className="mf">9.4e-12</span>
          {"\n"}
          {"    "}
          <span className="n">v_t</span> <span className="o">=</span>{" "}
          <span className="mf">25.85e-3</span>
          {"\n"}
          {"    "}
          <span className="n">c</span> <span className="o">=</span>{" "}
          <span className="nb">abs</span>
          <span className="p">(</span>
          <span className="n">U</span> <span className="o">-</span>{" "}
          <span className="n">v_t</span> <span className="o">*</span>{" "}
          <span className="n">np</span>
          <span className="o">.</span>
          <span className="n">log</span>
          <span className="p">(</span>
          <span className="nb">abs</span>
          <span className="p">(</span>
          <span className="n">I</span>
          <span className="p">[:,</span> <span className="mi">0</span>
          <span className="p">]</span> <span className="o">/</span>{" "}
          <span className="n">I_s</span>
          <span className="p">))</span> <span className="o">-</span>{" "}
          <span className="n">R</span> <span className="o">*</span>{" "}
          <span className="n">I</span>
          <span className="p">[:,</span> <span className="mi">0</span>
          <span className="p">])</span>
          {"\n"}
          <span className="k">return</span> <span className="n">c</span>
          {"\n"}
        {"\n"}
        {"\n"}
        </pre>
      </div>
    </div>
  </div>
</div>
          
                  
                  To solve this problem, the global-best optimizer is going to be used.
                  <InputLabel>Cost= {cost}</InputLabel>
                  <InputLabel>POSITION = {pos} </InputLabel>
                  
                </Typography>

              )}
              {activeStep===3&&(
                <Typography>
                  The current flowing through the circuit is approximately 0.094 A which yields a cost of almost zero. 
                  The graph below illustrates the relationship between the cost c and the current I. 
                  {"\n"}
                  As shown, the cost reaches its minimum value of zero when I is somewhere close to 0.09.
                <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
                </div> 
                
                </Typography>
              )
              }

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </Box>

      </Container>
    </Page>
  );
}
