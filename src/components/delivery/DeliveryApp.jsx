import React, { useState } from 'react';
import { Navigation, Phone, CheckCircle, MapPin, List, Camera, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DeliveryApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Rahul Sharma', address: 'Block A, 204, Sunshine Apts', dist: '0.8 km', status: 'pending', phone: '+91 98765 43210', lat: 12.97, lng: 77.59 },
    { id: 2, name: 'Priya Singh', address: 'H.No 45, Sector 12', dist: '1.2 km', status: 'pending', phone: '+91 98765 43211', lat: 12.98, lng: 77.60 },
    { id: 3, name: 'Amit Verma', address: 'Tech Park, Building 3', dist: '2.5 km', status: 'completed', phone: '+91 98765 43212', lat: 12.96, lng: 77.58 },
  ]);

  const [selectedTask, setSelectedTask] = useState(tasks[0]);

  const handleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));
    if (selectedTask?.id === id) {
      setSelectedTask(prev => ({...prev, status: 'completed'}));
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 lg:px-8 flex justify-between items-center shrink-0">
         <div>
            <h1 className="text-lg font-bold text-white">Delivery Partner</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-xs text-slate-400">Online • North Sector</p>
            </div>
         </div>
         <div className="text-right bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Earnings</p>
            <p className="text-lg font-bold text-green-400">₹850</p>
         </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel (Task List) */}
        <div className="w-full lg:w-[450px] bg-slate-950 flex flex-col border-r border-slate-800">
          <div className="p-4 pb-0">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="w-full bg-slate-900 border border-slate-800">
                <TabsTrigger value="pending" className="flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Pending ({tasks.filter(t => t.status === 'pending').length})</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Completed ({tasks.filter(t => t.status === 'completed').length})</TabsTrigger>
              </TabsList>

              <div className="mt-4 relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                 <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
                 />
              </div>

              <div className="h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar pb-4 mt-4 space-y-3">
                <TabsContent value="pending" className="mt-0 space-y-3">
                   {tasks.filter(t => t.status === 'pending').map(task => (
                     <TaskCard 
                        key={task.id} 
                        task={task} 
                        active={selectedTask?.id === task.id}
                        onClick={() => setSelectedTask(task)}
                        onComplete={handleComplete} 
                     />
                   ))}
                </TabsContent>
                <TabsContent value="completed" className="mt-0 space-y-3">
                   {tasks.filter(t => t.status === 'completed').map(task => (
                     <TaskCard 
                        key={task.id} 
                        task={task} 
                        active={selectedTask?.id === task.id}
                        onClick={() => setSelectedTask(task)}
                        isCompleted 
                     />
                   ))}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Right Panel (Map/Details) - Hidden on Mobile, Visible on Desktop */}
        <div className="hidden lg:flex flex-1 bg-slate-900 relative flex-col">
           {selectedTask ? (
             <>
               {/* Map Placeholder */}
               <div className="flex-1 bg-slate-800/50 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ 
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                  }}></div>
                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/30 animate-bounce">
                      <MapPin className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Map View</h3>
                    <p className="text-slate-400">Navigating to {selectedTask.address}</p>
                  </div>
               </div>
               
               {/* Action Bar */}
               <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedTask.name}</h2>
                    <p className="text-slate-400">{selectedTask.address}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-700">
                      <Phone className="w-4 h-4 mr-2" /> Call Customer
                    </Button>
                    {selectedTask.status !== 'completed' && (
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                        Complete Delivery
                      </Button>
                    )}
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 flex items-center justify-center text-slate-500">
               Select a task to view details
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, active, onClick, onComplete, isCompleted }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div 
      onClick={onClick}
      className={`
        border rounded-xl p-4 relative overflow-hidden cursor-pointer transition-all
        ${active ? 'bg-slate-800 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}
      `}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 bg-green-500/20 text-green-500 px-2 py-1 text-xs font-bold rounded-bl-lg">
          DELIVERED
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-white text-base">{task.name}</h3>
          <p className="text-sm text-slate-300 flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1 text-indigo-400" /> {task.address}
          </p>
        </div>
        <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">{task.dist}</span>
      </div>

      {!isCompleted && (
        <div className="grid grid-cols-2 gap-3 mt-4" onClick={e => e.stopPropagation()}>
          <Button size="sm" variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
            <Phone className="w-3.5 h-3.5 mr-2" /> Call
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Navigation className="w-3.5 h-3.5 mr-2" /> Map
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="col-span-2 bg-green-600 hover:bg-green-700 text-white mt-1 h-9">
                Mark Delivered
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-sm mx-auto rounded-xl">
              <DialogHeader>
                <DialogTitle>Proof of Delivery</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed border-slate-700 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800/50 transition-colors">
                  <Camera className="w-8 h-8 text-slate-500 mb-2" />
                  <p className="text-sm text-slate-500">Tap to take photo</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 border-slate-700 text-slate-300">Cancel</Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      onComplete(task.id);
                      setIsDialogOpen(false);
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default DeliveryApp;