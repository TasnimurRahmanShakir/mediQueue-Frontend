"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export function AddMedicationModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "Daily",
    duration: "7 days",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;

    // Format the payload to match existing structure or desired format
    const newMedication = {
      name: formData.name,
      dosage: `${formData.dosage}, ${formData.frequency} for ${formData.duration}`,
    };

    onSave(newMedication);
    // Reset form
    setFormData({
      name: "",
      dosage: "",
      frequency: "Daily",
      duration: "7 days",
      notes: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Medication">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medication Name
          </label>
          <Input
            name="name"
            placeholder="e.g. Amoxicillin"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage Strength
            </label>
            <Input
              name="dosage"
              placeholder="e.g. 500mg"
              value={formData.dosage}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Daily">Daily</option>
              <option value="2x Daily">2x Daily</option>
              <option value="3x Daily">3x Daily</option>
              <option value="Every 4h">Every 4h</option>
              <option value="As needed">As needed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <Input
            name="duration"
            placeholder="e.g. 7 days"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none h-20"
            placeholder="e.g. Take with food"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Prescription
          </Button>
        </div>
      </form>
    </Modal>
  );
}
