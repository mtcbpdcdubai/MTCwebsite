import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { X, ExternalLink, Calendar, Users, Trophy } from 'lucide-react';

const PartnershipModal = ({ isOpen, onClose, partnership }) => {
  if (!partnership) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'event':
        return <Calendar className="text-blue-400" size={24} />;
      case 'collaboration':
        return <Users className="text-green-400" size={24} />;
      case 'achievement':
        return <Trophy className="text-yellow-400" size={24} />;
      default:
        return <ExternalLink className="text-gray-400" size={24} />;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "bg-gray-900 border border-white/20",
        header: "border-b border-white/20",
        body: "py-6",
        footer: "border-t border-white/20"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-3 text-white">
          {getIcon(partnership.type)}
          <div>
            <h3 className="text-xl font-bold">{partnership.title}</h3>
            <p className="text-sm text-gray-400">{partnership.organization}</p>
          </div>
        </ModalHeader>
        
        <ModalBody className="text-gray-300">
          {partnership.image && (
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
              <img 
                src={partnership.image} 
                alt={partnership.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-semibold mb-2">About the Partnership</h4>
              <p className="leading-relaxed">{partnership.description}</p>
            </div>
            
            {partnership.achievements && (
              <div>
                <h4 className="text-white font-semibold mb-2">Key Achievements</h4>
                <ul className="list-disc list-inside space-y-1">
                  {partnership.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {partnership.impact && (
              <div>
                <h4 className="text-white font-semibold mb-2">Impact</h4>
                <p className="leading-relaxed">{partnership.impact}</p>
              </div>
            )}
            
            {partnership.duration && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} />
                <span>Duration: {partnership.duration}</span>
              </div>
            )}
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            color="danger" 
            variant="light" 
            onPress={onClose}
            startContent={<X size={16} />}
          >
            Close
          </Button>
          {partnership.link && (
            <Button 
              color="primary" 
              onPress={() => window.open(partnership.link, '_blank')}
              startContent={<ExternalLink size={16} />}
            >
              Learn More
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PartnershipModal;